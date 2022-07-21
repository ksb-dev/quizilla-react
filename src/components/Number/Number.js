import React, { useState } from 'react'

const Number = () => {
  const handleChange = () => {}

  return (
    <div className='number'>
      <input
        type='number'
        placeholder='number of questions'
        onChange={handleChange}
      />
    </div>
  )
}

export default Number
