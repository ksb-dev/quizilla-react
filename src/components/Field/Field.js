import React, { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux/es/exports'
import {
  handleCategoryChange,
  handleDifficultyChange,
  handleTypeChange,
  handleAmountChange
} from '../../redux/actions'

const Field = ({ defaultState, options, label }) => {
  const [fieldName, setFieldName] = useState(defaultState)
  const [fieldId, setFieldId] = useState(0)
  const [fieldState, setFieldState] = useState(false)
  const fieldRef = useRef(null)
  const optionsRef = useRef(null)
  const fieldIcon = useRef(null)
  const nameRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!fieldRef.current.contains(e.target)) {
        setFieldState(false)
      }
    }

    if (fieldState) {
      optionsRef.current.style.transform = 'scale(1)'
      optionsRef.current.style.pointerEvents = 'all'
      fieldIcon.current.style.transform = 'rotate(180deg)'
      nameRef.current.style.top = '-0.55rem'
      nameRef.current.style.fontSize = '0.7rem'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      fieldIcon.current.style.transform = 'rotate(0deg)'
      nameRef.current.style.top = '0.5rem'
      nameRef.current.style.fontSize = '0.9rem'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [fieldState])

  const toggleCategories = () => {
    setFieldState(!fieldState)
    setFieldName(defaultState)
  }

  const setOption = (option, id) => {
    setFieldName(option)
    setFieldId(id)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    fieldIcon.current.style.transform = 'rotate(0deg)'
    nameRef.current.style.top = '0.5rem'
    nameRef.current.style.fontSize = '0.9rem'

    setFieldState(!fieldState)

    switch (label) {
      case 'category':
        dispatch(handleCategoryChange(id))
        break
      case 'difficulty':
        dispatch(handleDifficultyChange(id))
        break
      case 'type':
        dispatch(handleTypeChange(id))
        break
      default:
        return
    }
  }

  return (
    <div ref={fieldRef} className='field'>
      <div
        className={fieldState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <span ref={nameRef} className={fieldState ? 'blueColor' : 'greyColor'}>
          {fieldName.startsWith('Entertainment')
            ? fieldName.substring(15)
            : fieldName}
        </span>

        <i
          ref={fieldIcon}
          className={
            fieldState
              ? ' fa-solid fa-angle-down blueColor'
              : ' fa-solid fa-angle-down greyColor'
          }
        ></i>
      </div>

      <div ref={optionsRef} className='options'>
        {options.length > 0 &&
          options.map((option, index) => (
            <p
              className='option'
              onClick={() => setOption(option.name, option.id)}
              key={index}
            >
              {option.name.startsWith('Entertainment')
                ? option.name.substring(15)
                : option.name}
            </p>
          ))}
      </div>
    </div>
  )
}

export default Field
