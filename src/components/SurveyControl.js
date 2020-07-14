import React, { useState } from 'react'
import SurveyList from './SurveyList'
import NewSurveyFrom from './NewSurveyForm'
import { withFirestore, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'




function SurveyControl() {
  const [formVisible, setFormVisible] = useState(false)

  const auth = firebase.auth();

  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser == null)) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    )
  }
  if ((isLoaded(auth)) && (auth.currentUser != null)) {
    return (
      <div>
        {formVisible ? <NewSurveyFrom setFormVisible={setFormVisible} /> : <SurveyList setFormVisible={setFormVisible} />}
      </div >
    )
  }
}

export default withFirestore(SurveyControl);
