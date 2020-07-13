import React from 'react'

export default function ShowAnwers(props) {
  const { survey, answer } = props;
  return (
    <div>
      <p>Survey name: {survey.name}</p>
      <p>Survey q1: {survey.q1}</p>
      <p>Survey right answer: {survey.a1}</p>
      <p>Survey your answer: {answer}</p>
      <button>Edit</button>
    </div>
  )
}
