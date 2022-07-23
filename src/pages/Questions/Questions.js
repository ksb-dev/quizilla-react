import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../../hooks/useAxios'

const Questions = () => {
  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score
  } = useSelector(state => state)

  let apiUrl = `/api.php?amount=${amount_of_question}`

  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`)
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`)
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`)
  }

  const { response, loading } = useAxios({ url: apiUrl })
  const [questionIndex, setQuestionIndex] = useState(0)

  console.log('question_category : ' + question_category)
  console.log('question_difficulty : ' + question_difficulty)
  console.log('question_type : ' + question_type)
  console.log('amount_of_question : ' + amount_of_question)

  console.log(response)

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }
  console.log(response.results)

  return (
    <div className='questions'>
      <div className='questions__inner'>
        <h2>question {questionIndex + 1}</h2>
        <h3>{response.results[questionIndex].question}</h3>
        <div className='answers'>
          <p>answer 1</p>
          <p>answer 2</p>
          <p>answer 3</p>
          <p>answer 4</p>
        </div>

        <div className='score'>
          <p>
            <span>Score :</span> 2 / 6
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
