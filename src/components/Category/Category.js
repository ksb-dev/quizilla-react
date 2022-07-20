import React, { useState, useEffect, useRef } from 'react'

const Category = () => {
  const [categoryName, setCategoryName] = useState('categories')
  const [categoryState, setCategoryState] = useState(false)
  const categoryRef = useRef(null)
  const optionsRef = useRef(null)
  const categoryIcon = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!categoryRef.current.contains(e.target)) {
        setCategoryState(false)
      }
    }

    if (categoryState) {
      optionsRef.current.style.transform = 'scale(1)'
      optionsRef.current.style.pointerEvents = 'all'
      categoryIcon.current.style.transform = 'rotate(180deg)'
      nameRef.current.style.top = '-0.55rem'
      nameRef.current.style.fontSize = '0.7rem'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      categoryIcon.current.style.transform = 'rotate(0deg)'
      nameRef.current.style.top = '0.5rem'
      nameRef.current.style.fontSize = '0.9rem'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [categoryState])

  const toggleCategories = () => {
    setCategoryState(!categoryState)
    setCategoryName('categories')
  }

  const setOption = option => {
    setCategoryName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    categoryIcon.current.style.transform = 'rotate(0deg)'
    nameRef.current.style.top = '0.5rem'
    nameRef.current.style.fontSize = '0.9rem'

    setCategoryState(!categoryState)
  }

  return (
    <div ref={categoryRef} className='category'>
      <div
        className={categoryState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <p ref={nameRef} className={categoryState ? 'blueColor' : 'greyColor'}>
          {categoryName}
        </p>

        <i
          ref={categoryIcon}
          className={
            categoryState
              ? ' fa-solid fa-angle-down blueColor'
              : ' fa-solid fa-angle-down greyColor'
          }
        ></i>
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
