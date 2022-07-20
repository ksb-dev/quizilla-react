import React, { useState, useEffect, useRef } from 'react'

const Category = () => {
  const [categoryName, setCategoryName] = useState('categories')
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)
  const optionsRef = useRef(null)
  const categoryIcon = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!categoryRef.current.contains(e.target)) {
        setCategoryState(false)
      }
    }

    if (categoryState) {
      optionsRef.current.style.opacity = '1'
      optionsRef.current.style.pointerEvents = 'all'
      categoryIcon.current.style.transform = 'rotate(180deg)'
    } else {
      optionsRef.current.style.opacity = '0'
      optionsRef.current.style.pointerEvents = 'none'
      categoryIcon.current.style.transform = 'rotate(0deg)'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [categoryState])

  const toggleCategories = () => {
    setCategoryState(!categoryState)
  }

  const setOption = option => {
    setCategoryName(option)

    optionsRef.current.style.opacity = '0'
    optionsRef.current.style.pointerEvents = 'none'
    categoryIcon.current.style.transform = 'rotate(0deg)'

    setCategoryState(!categoryState)
  }

  return (
    <div ref={categoryRef} className='category'>
      <div className='input'>
        <div
          className={
            categoryState
              ? 'input__inner blueBorder'
              : 'input__inner greyBorder'
          }
          onClick={() => toggleCategories()}
        >
          {!categoryState ? <p>{categoryName}</p> : <p></p>}

          <i ref={categoryIcon} className='fa-solid fa-angle-down'></i>
        </div>
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
  )
}

export default Category
