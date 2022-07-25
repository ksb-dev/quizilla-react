import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAxios from '../../hooks/useAxios'
import { handleScoreChange, handleAmountChange } from '../../redux/actions'
import { useNavigate } from 'react-router-dom'
import { decode } from 'html-entities'

const getRandom = max => {
  return Math.floor(Math.random() * Math.floor(max))
}

const Questions = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(10))
    navigate('/')
  }

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
  const [counter, setCounter] = useState(30)
  const [clicked, setClicked] = useState(1)
  let count = 30

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

      const interval = setInterval(() => {
        count--

        if (count > 0) {
          setCounter(prevCounter => prevCounter - 1)
        } else {
          //clearInterval(interval)
          setCounter(30)

          if (questionIndex + 1 < response.results.length) {
            setQuestionIndex(questionIndex + 1)
          } else {
            navigate('/score')
          }
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [response, questionIndex])

  if (loading) {
    return (
      <div className='loading'>
        <div className='loader'></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='error'>
        <div className='error__inner'>
          <p>{error}</p>
          <p className='again' onClick={() => handleReset()}>
            Back to home
          </p>
        </div>
      </div>
    )
  }

  const handleClickNext = e => {
    setCounter(30)
    setClicked(0)

    if (questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1)
    } else {
      navigate('/score')
    }
  }

  const handleClickAnswer = e => {
    const question = response.results[questionIndex]

    if (clicked === 0) {
      setClicked(1)

      if (e.target.textContent === question.correct_answer) {
        dispatch(handleScoreChange(score + 1))
      }
    }
  }

  return (
    <div className='questions'>
      <div className='questions__inner'>
        <div className='number-timer'>
          <h2 className='number'>question {questionIndex + 1}</h2>
          <p className='timer'>
            timer: <span>{counter}</span>
          </p>
        </div>
        <h3 className='question'>
          {decode(response.results[questionIndex].question)}
        </h3>
        <div className='answers'>
          {options.map((option, id) => (
            <p key={id} onClick={e => handleClickAnswer(e)}>
              {decode(option)}
            </p>
          ))}
        </div>

        <div className='score-quit-next'>
          <p className='quit' onClick={() => handleReset()}>
            quit
          </p>
          <p className='score'>
            <span>Score :</span> {score} / {response.results.length}
          </p>
          <p className='next' onClick={handleClickNext}>
            next
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
