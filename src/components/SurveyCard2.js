import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import ShowAnwers from './ShowAnwers'
import firebase from "firebase/app";
import { useFirestore } from 'react-redux-firebase';

export default function SurveyCard(props) {
  const { survey } = props;
  const firestore = useFirestore();
  const [visible, setVisible] = useState(false)
  const [resultVisible, setresultVisible] = useState(false)
  const [check, setCheck] = useState('')
  const auth = firebase.auth();
  const addAnswer = () => {
    firestore.collection("answers").add({ surveyId: survey.id, /*  something like this to include user userId: auth.currentUser.id, */ answer: check })
    setresultVisible(true)
  }

  return (
    <div>
      <h1>{survey.name}</h1>
      <Button type="primary" onClick={() => setVisible(true)}>
        Answer
      </Button>
      <Modal title={survey.name} visible={visible} onOk={resultVisible ? () => { setVisible(false); setresultVisible(false) } : () => addAnswer()} onCancel={() => setVisible(false)}>
        {resultVisible ? <ShowAnwers answer={check} survey={survey} /> :
          <>
            <label htmlFor="q1">{survey.q1} </label>
            <input name="q1" onChange={e => setCheck(e.target.value)} type="text" />
          </>

        }
      </Modal>
    </div>
  )
}