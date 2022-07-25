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
    dispatch(handleAmountChange(50))
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
  const [counter, setCounter] = useState(0)
  let count = 0

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     count++

  //     if (count <= 30) {
  //       setCounter(prevCounter => prevCounter + 1)
  //     } else {
  //       //clearInterval(interval)
  //       setCounter(0)

  //       if (questionIndex + 1 < response.results.length) {
  //         setQuestionIndex(questionIndex + 1)
  //       } else {
  //         navigate('/score')
  //       }
  //     }
  //   }, 1000)

  //   return () => clearInterval(interval)
  // }, [])

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
        count++

        if (count <= 30) {
          setCounter(prevCounter => prevCounter + 1)
        } else {
          //clearInterval(interval)
          setCounter(0)

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

  // console.log(response.results)
  const handleClickAnswer = e => {
    setCounter(0)
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
            <p key={id} onClick={handleClickAnswer}>
              {decode(option)}
            </p>
          ))}
        </div>

        <div className='score'>
          <p className='quit'>quit</p>
          <p>
            <span>Score :</span> {score} / {response.results.length}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
