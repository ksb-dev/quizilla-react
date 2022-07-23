import React from 'react'

// components
import Field from '../../components/Field/Field'
import Number from '../../components/Number/Number'

// hooks
import useAxios from '../../hooks/useAxios'

const Select = () => {
  const { response, error, loading } = useAxios({ url: 'api_category.php' })

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

  const difficultyOptions = [
    { id: 'easy', name: 'easy' },
    { id: 'medium', name: 'medium' },
    { id: 'high', name: 'high' }
  ]
  const typeOptions = [
    { id: 'multiple', name: 'Multiple Choice' },
    { id: 'boolean', name: 'True/False' }
  ]

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizly</h2>

        <form className='container__inner-form' onSubmit={handleSubmit}>
          <Field
            defaultState={'categories'}
            options={response.trivia_categories}
          />
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
