import React, { useState, useEffect, useRef } from 'react'

const Select = () => {
  const [categoryName, setCategoryName] = useState('categories')
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)
  const optionsRef = useRef(null)
  const categoryIcon = useRef(null)

  useEffect(() => {
    if (categoryState) {
      optionsRef.current.style.transform = 'scale(1)'
      optionsRef.current.style.pointerEvents = 'all'
      categoryIcon.current.style.transform = 'rotate(180deg)'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      categoryIcon.current.style.transform = 'rotate(0deg)'
    }
  }, [categoryState])

  const toggleCategories = () => {
    setCategoryState(!categoryState)
  }

  const setOption = option => {
    setCategoryName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    categoryIcon.current.style.transform = 'rotate(0deg)'

    setCategoryState(!categoryState)
  }

  return (
    <div className='container'>
      <div className='container__inner'>
        <h2 className='container__inner-title'>Quizilla</h2>

        <div ref={categoryRef} className='container__inner-category'>
          <div className='input' onClick={() => toggleCategories()}>
            <p>{categoryName}</p>

            <i ref={categoryIcon} className='fa-solid fa-angle-down'></i>
          </div>

          <div ref={optionsRef} className='options'>
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
