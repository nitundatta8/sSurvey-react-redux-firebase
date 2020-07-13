import React, { useState } from 'react'
import { Modal, Button } from 'antd'

export default function SurveyCard(props) {
  const { survey } = props;
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <h1>{survey.name}</h1>
      <Button type="primary" onClick={() => setVisible(true)}>
        Show Details
        </Button>
      <Modal
        title={survey.name}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>{survey.q1}</p>
        <p>{survey.a1}</p>
      </Modal>
    </div>
  )
}
