import React, { useState, useEffect, useRef } from 'react'

const Field = ({ defaultState, options }) => {
  const [fieldName, setFieldName] = useState(defaultState)
  const [fieldState, setFieldState] = useState(false)
  const fieldRef = useRef(null)
  const optionsRef = useRef(null)
  const fieldIcon = useRef(null)
  const nameRef = useRef(null)

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

  const setOption = option => {
    setFieldName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    fieldIcon.current.style.transform = 'rotate(0deg)'
    nameRef.current.style.top = '0.5rem'
    nameRef.current.style.fontSize = '0.9rem'

    setFieldState(!fieldState)
  }

  return (
    <div ref={fieldRef} className='field'>
      <div
        className={fieldState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <p ref={nameRef} className={fieldState ? 'blueColor' : 'greyColor'}>
          {fieldName.startsWith('Entertainment')
            ? fieldName.substring(15)
            : fieldName}
        </p>

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
              onClick={() => setOption(option.name)}
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
