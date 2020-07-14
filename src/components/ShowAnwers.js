import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect, isLoaded, } from 'react-redux-firebase';
import EditSurveyForm from './EditSurveyForm'

export default function ShowAnwers(props) {
  const { survey } = props;
  const firestore = useFirestore();
  const [showForm, setShowForm] = useState(false)

  useFirestoreConnect([{ collection: 'answers' }])
  const answers = useSelector(state => state.firestore.ordered.answers)
  const deleteSurvey = () => {
    firestore.delete({ collection: 'surveys', doc: survey.id });
  }
  if (isLoaded(answers)) {
    return (
      <div>
        <p>Survey name: {survey.name}</p>
        <p>Survey q1: {survey.q1}</p>
        <p>Survey right answer: {survey.a1}</p>
        <p>People have answered:</p>
        <ul>

          {answers.map(a => {
            if (a.surveyId === survey.id) {
              console.log(a.answer)
              return <li key={a.id}>{a.answer}</li>
            }
          }
          )}
        </ul>

        {showForm ? <EditSurveyForm survey={survey} setShowForm={setShowForm} id={survey.id} /> : <button onClick={() => setShowForm(true)}>Edit</button>}
        <button onClick={deleteSurvey}>Delete</button>
      </div>
    )
  }
  else {
    return (<h2>Loading...</h2>)
  }
}
