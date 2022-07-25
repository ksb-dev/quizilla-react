import React from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { handleAmountChange } from '../../redux/actions'

const Number = () => {
  const dispatch = useDispatch()
  const handleChange = e => {
    dispatch(handleAmountChange(e.target.value))
  }

  return (
    <div className='number'>
      <input
        type='number'
        placeholder='enter number of questions'
        onChange={handleChange}
      />
    </div>
  )
}

export default Number
