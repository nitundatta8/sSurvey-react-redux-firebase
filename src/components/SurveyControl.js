// import React, { Component, useState } from 'react'

// class SurveyControl extends Component {
//   render() {
//     return (
//       <div>

//       </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//    // masterSurvayList: state.masterSurvayList,
//     //formVisibleOnPage: state.formVisibleOnPage
//   }
// }

// export default  SurveyControl = connect(mapStateToProps)(SurveyControl);

import React, { useState } from 'react'
import Header from './Header'
import SurveyList from './SurveyList'
import NewSurveyFrom from './NewSurveyForm'

export default function SurveyControl() {
  const [formVisible, setFormVisible] = useState(false)
  return (
    <div>
      <Header />
      {formVisible ? <NewSurveyFrom setFormVisible={setFormVisible} /> : <SurveyList setFormVisible={setFormVisible} />}
    </div >
  )
}


