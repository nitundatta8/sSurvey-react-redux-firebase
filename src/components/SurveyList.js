import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, /*isEmpty*/ } from 'react-redux-firebase'
import SurveyCard from './SurveyCard'

export default function SurveyList(props) {
  const { setFormVisible } = props

  const changeView = (event) => {
    setFormVisible(true)
  }

  useFirestoreConnect([{ collection: 'surveys' }])
  const surveys = useSelector(state => state.firestore.ordered.surveys)

  if (isLoaded(surveys)) {
    return (
      <>
        {surveys.map(survey => <SurveyCard survey={survey} key={survey.id} />)}
        <button onClick={changeView}>Add Survey</button>
      </>
    )
  } else {
    return (
      <h3>give it a sec</h3>
    )
  }
}
