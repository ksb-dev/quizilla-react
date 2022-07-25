import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useAxios from '../../hooks/useAxios'
import { useDispatch } from 'react-redux'
import { handleScoreChange } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'

const getRandom = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

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

  const { response, loading, error } = useAxios({ url: apiUrl })
  const [questionIndex, setQuestionIndex] = useState(0)
  const [options, setOptions] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //console.log(options)

  useEffect(() => {
    if (response.results) {
      const question = response.results[questionIndex]
      let answers = [...question.incorrect_answers]

      answers.splice(
        getRandom(question.incorrect_answers.length),
        0,
        question.correct_answer
      )
      setOptions(answers)
    }
  }, [response, questionIndex])

  // console.log('question_category : ' + question_category)
  // console.log('question_difficulty : ' + question_difficulty)
  // console.log('question_type : ' + question_type)
  // console.log('amount_of_question : ' + amount_of_question)

  // console.log(response)

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }

  if (error) {
    return <p>Something went wrong!</p>
  }

  // console.log(response.results)
  const handleClickAnswer = e => {
    const question = response.results[questionIndex]
    if (e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1))
    }

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/score')
    }
  }

  return (
    <div className='questions'>
      <div className='questions__inner'>
        <h2>question {questionIndex + 1}</h2>
        <h3>{decode(response.results[questionIndex].question)}</h3>
        <div className='answers'>
          {options.map((option, id) => (
            <p key={id} onClick={handleClickAnswer}>
              {decode(option)}
            </p>
          ))}
        </div>

        <div className='score'>
          <p>
            <span>Score :</span> {score} / {response.results.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
