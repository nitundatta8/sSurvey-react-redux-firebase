import React from 'react'
import TicketList from './TicketList'
import NewTicketForm from './NewTicketForm'
import TicketDetail from './TicketDetail'
import EditTicketForm from './EditTicketForm'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
import { withFirestore } from 'react-redux-firebase'


class TicketControl extends React.Component {
  constructor(probs) {
    super(probs);
    this.state = {

      selectedTicket: null,
      editing: false
    };
  };
  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() => this.updateTicketElapsedWaitTime(), 6000);
  }
  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount() {
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    console.log("tick");
    const { dispatch } = this.props;
    Object.values(this.props.masterTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      console.log("ddd")
      dispatch(action);
    });
  }

  handleAddingNewTicketToList = () => {
    //const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
    const { dispatch } = this.props;
    const action2 = a.toggleForm();
    dispatch(action2);
  };

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({ collection: 'tickets', doc: id }).then((ticket) => {
      const firestoreTicket = {
        names: ticket.get("names"),
        location: ticket.get("location"),
        issue: ticket.get("issue"),
        id: ticket.id
      }
      this.setState({ selectedTicket: firestoreTicket });
    });
  };


  handleEditClick = () => {
    console.log("handleEditClick reached");
    this.setState({ editing: true })
  };

  handleEditingTicketInList = () => {

    this.setState({
      editing: false,
      selectedTicket: null
    });
  }


  handleDeletingTicket = (id) => {
    this.props.firestore.delete({ collection: 'tickets', doc: id });
    this.setState({ selectedTicket: null });
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false,
        selectedTicket: null,
        editing: false // new code
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }




  render() {
    let currentlyVisibleState = null;
    let buttonText = null;
    console.log("printing master");
    console.log(this.props.masterTicketList);

    if (this.state.editing) {
      currentlyVisibleState = <EditTicketForm ticket={this.state.selectedTicket}
        onEditTicket={this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket={this.state.selectedTicket}
        onClickingDelete={this.handleDeletingTicket} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm
        onNewTicketCreation={this.handleAddingNewTicketToList} />
      buttonText = "Return to Ticket List";
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.masterTicketList} onTicketSelection={this.handleChangingSelectedTicket} />
      buttonText = "Add Tricket";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    masterTicketList: state.masterTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}
TicketControl = connect(mapStateToProps)(TicketControl);
TicketControl.propTypes = {
  masterTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};
export default withFirestore(TicketControl);