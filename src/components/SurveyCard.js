import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import ShowAnwers from './ShowAnwers'

export default function SurveyCard(props) {
  const { survey } = props;
  const [visible, setVisible] = useState(false)
  const [resultVisible, setresultVisible] = useState(false)
  const [check, setCheck] = useState('')
  const [resultText, setResultText] = useState('')
  const checkAnswer = () => {
    console.log(`check=>${check}, answer=>${survey.a1}`)
    if (check === survey.a1) {
      setResultText("you got it Right!");
    } else {
      setResultText("you got it Wrong!");
    }
    setresultVisible(true)
  }
  return (
    <div>
      <h1>{survey.name}</h1>
      <Button type="primary" onClick={() => setVisible(true)}>
        Answer
      </Button>
      <Modal
        title={survey.name}
        visible={visible}
        onOk={checkAnswer}
        onCancel={() => setVisible(false)}
      >

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
