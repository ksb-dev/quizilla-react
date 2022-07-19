import React, { useState, useEffect, useRef } from 'react'

const Select = () => {
  const [categoryName, setCategoryName] = useState('categories')
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)
  const categoryIcon = useRef(null)

  useEffect(() => {
    if (categoryState) {
      categoryRef.current.style.transform = 'scale(1)'
      categoryRef.current.style.pointerEvents = 'all'
      categoryIcon.current.style.transform = 'rotate(180deg)'
    } else {
      categoryRef.current.style.transform = 'scale(0)'
      categoryRef.current.style.pointerEvents = 'none'
      categoryIcon.current.style.transform = 'rotate(0deg)'
    }
  }, [categoryState])

  const toggleCategories = () => {
    setCategoryState(!categoryState)
  }

  const setOption = option => {
    setCategoryName(option)
  }

  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizilla</h2>

        <div className='container__inner-form'>
          <div className='input' onClick={() => toggleCategories()}>
            <p>{categoryName}</p>

            <i ref={categoryIcon} className='fa-solid fa-angle-down'></i>
          </div>

          <div ref={categoryRef} className='options'>
            <p className='option' onClick={() => setOption('option1')}>
              option1
            </p>
            <p className='option' onClick={() => setOption('option2')}>
              option2
            </p>
            <p className='option' onClick={() => setOption('option3')}>
              option3
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
