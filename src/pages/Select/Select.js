import React from 'react'

// components
import Field from '../../components/Field/Field'
import Number from '../../components/Number/Number'

const Select = () => {
  const categoryOptions = ['option1', 'option2', 'option3']
  const difficultyOptions = ['low', 'medium', 'high']
  const typeOptions = ['MCQ', 'True/False']

  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizly</h2>

        <form className='container__inner-form'>
          <Field defaultState={'categories'} options={categoryOptions} />
          <Field defaultState={'difficulty'} options={difficultyOptions} />
          <Field defaultState={'type'} options={typeOptions} />
          <Number />

          <button className='submitBtn'>Get Started</button>
        </form>
      </div>
    </div>
  )
}

export default Select
