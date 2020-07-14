import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase';
import EditSurveyForm from './EditSurveyForm'

export default function ShowAnwers(props) {
  const { survey, answer } = props;
  const firestore = useFirestore();
  const [showForm, setShowForm] = useState(false)
  const deleteSurvey = () => {
    firestore.delete({ collection: 'surveys', doc: survey.id });
  }
  return (
    <div>
      <p>Survey name: {survey.name}</p>
      <p>Survey q1: {survey.q1}</p>
      <p>Survey right answer: {survey.a1}</p>
      <p>Survey your answer: {answer}</p>

      {showForm ? <EditSurveyForm survey={survey} setShowForm={setShowForm} id={survey.id} /> : <button onClick={() => setShowForm(true)}>Edit</button>}
      <button onClick={deleteSurvey}>Delete</button>
    </div>
  )
}
