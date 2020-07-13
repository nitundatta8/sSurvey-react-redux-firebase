import React from 'react'
import { useFirestore } from 'react-redux-firebase';

export default function EditSurveyForm(props) {
  const { id } = props
  const firestore = useFirestore();
  const [name, setName] = useState('')
  const [q1, setQ1] = useState('');
  const [a1, setA1] = useState('');

  const editSurvey = () => {
    console.log(q1, a1)
    ///change visiblity 
    return firestore.update({ collection: 'surveys', doc: survey.id }, { name, q1, a1 })
  }
  return (
    <form>
      <input onChange={event => { setName(event.target.value) }} type="text" name="name" placeholder="Name Your survey" />
      <input onChange={event => { setQ1(event.target.value) }} type="text" name="q1" placeholder="Enter a Question for your survey" />
      <input onChange={event => { setA1(event.target.value) }} type="text" name="a1" placeholder="Enter an answer for the pervious question" />
      <button onClick={AddSurvey}>change again</button>
    </form>
  )
}
