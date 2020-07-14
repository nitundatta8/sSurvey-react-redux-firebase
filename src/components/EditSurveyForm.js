import React, { useState } from 'react'
import { useFirestore } from 'react-redux-firebase';

export default function EditSurveyForm(props) {
  const { id, setShowForm, survey } = props
  const firestore = useFirestore();
  const [name, setName] = useState(survey.name)
  const [q1, setQ1] = useState(survey.q1);
  const [a1, setA1] = useState(survey.a1);

  const editSurvey = () => {
    console.log(q1, a1)
    setShowForm(false)
    return firestore.update({ collection: 'surveys', doc: id }, { name, q1, a1 })
  }
  return (
    <form>
      <input onChange={event => { setName(event.target.value) }} type="text" name="name" defaultValue={name} />
      <input onChange={event => { setQ1(event.target.value) }} type="text" name="q1" defaultValue={q1} />
      <input onChange={event => { setA1(event.target.value) }} type="text" name="a1" defaultValue={a1} />
      <button onClick={editSurvey}>Save Edits</button> <button onClick={() => setShowForm(false)}>Cancel</button>
    </form>
  )
};


