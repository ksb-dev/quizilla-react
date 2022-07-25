import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { handleAmountChange, handleScoreChange } from '../../redux/actions'

const FinalScore = () => {
  const { score } = useSelector(state => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleReset = () => {
    dispatch(handleScoreChange(0))
    dispatch(handleAmountChange(10))
    navigate('/')
  }

  return (
    <div className='final__score'>
      <div className='final__score__inner'>
        <p>Your final score : {score}</p>
        <p className='again' onClick={() => handleReset()}>
          Play Again
        </p>
      </div>
    </div>
  )
}

export default FinalScore
