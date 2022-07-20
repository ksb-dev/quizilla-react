import React, { useState, useEffect, useRef } from 'react'

const Type = () => {
  const [typeName, setTypeName] = useState('')
  const [typeState, setTypeState] = useState(false)
  const typeRef = useRef(null)
  const optionsRef = useRef(null)
  const typeIcon = useRef(null)
  const nameRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!typeRef.current.contains(e.target)) {
        setTypeState(false)
      }
    }

    if (typeState) {
      optionsRef.current.style.transform = 'scale(1)'
      optionsRef.current.style.pointerEvents = 'all'
      typeIcon.current.style.transform = 'rotate(180deg)'
      // nameRef.current.style.top = '-0.55rem'
      // nameRef.current.style.fontSize = '0.7rem'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      typeIcon.current.style.transform = 'rotate(0deg)'
      // nameRef.current.style.top = '0.5rem'
      // nameRef.current.style.fontSize = '0.9rem'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [typeState])

  const toggleCategories = () => {
    setTypeState(!typeState)
    //setTypeName('type')
  }

  const setOption = option => {
    setTypeName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    typeIcon.current.style.transform = 'rotate(0deg)'
    // nameRef.current.style.top = '0.5rem'
    // nameRef.current.style.fontSize = '0.9rem'

    setTypeState(!typeState)
  }

  return (
    <div ref={typeRef} className='type'>
      <div className='input' onClick={() => toggleCategories()}>
        <p ref={nameRef}>type</p>

        <span>{typeName}</span>

        <i ref={typeIcon} className='fa-solid fa-angle-down'></i>
      </div>

      <div ref={optionsRef} className='options'>
        <p className='option' onClick={() => setOption('multiple choice')}>
          multiple choice
        </p>
        <p className='option' onClick={() => setOption('true/false')}>
          true/false
        </p>
      </div>
    </div>
  )
}

export default Type
