import React from 'react'
import { useNavigate } from 'react-router-dom'

// components
import Field from '../../components/Field/Field'
import Number from '../../components/Number/Number'

// hooks
import useAxios from '../../hooks/useAxios'

const Select = () => {
  const { response, error, loading } = useAxios({ url: 'api_category.php' })
  const navigate = useNavigate()

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
    navigate('/questions')
  }

  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizly</h2>

        <form className='container__inner-form' onSubmit={handleSubmit}>
          <Field
            defaultState={'categories'}
            options={response.trivia_categories}
            label='category'
          />
          <Field
            defaultState={'difficulty'}
            options={difficultyOptions}
            label='difficulty'
          />
          <Field defaultState={'type'} options={typeOptions} label='type' />
          <Number />

          <button className='submitBtn'>Get Started</button>
        </form>
      </div>
    </div>
  )
}

export default Select
