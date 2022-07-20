import React from 'react'

// components
import Category from '../../components/Category/Category'
import Difficulty from '../../components/Diificulty/Difficulty'
import Type from '../../components/Type/Type'
import Number from '../../components/Number/Number'

const Select = () => {
  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizly</h2>

        <form className='container__inner-form'>
          <Category />
          <Difficulty />
          <Type />
          <Number />

          <button className='submitBtn'>Get Started</button>
        </form>
      </div>
    </div>
  )
}

export default Select
