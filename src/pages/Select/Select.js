import React from 'react'

// components
import Category from '../../components/Category/Category'
import Difficulty from '../../components/Diificulty/Difficulty'
import Type from '../../components/Type/Type'

const Select = () => {
  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizilla</h2>

        <form className='container__inner-form'>
          <Category />
          <Difficulty />
          <Type />
        </form>
      </div>
    </div>
  )
}

export default Select
