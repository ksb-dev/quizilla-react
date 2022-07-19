import React, { useState, useEffect, useRef } from 'react'

const Type = () => {
  const [typeName, setTypeName] = useState('type')
  const [typeState, setTypeState] = useState(false)
  const typeRef = useRef(null)
  const optionsRef = useRef(null)
  const typeIcon = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!typeRef.current.contains(e.target)) {
        setTypeState(false)
      }
    }

    if (typeState) {
      optionsRef.current.style.opacity = '1'
      optionsRef.current.style.pointerEvents = 'all'
      typeIcon.current.style.transform = 'rotate(180deg)'
    } else {
      optionsRef.current.style.opacity = '0'
      optionsRef.current.style.pointerEvents = 'none'
      typeIcon.current.style.transform = 'rotate(0deg)'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [typeState])

  const toggleCategories = () => {
    setTypeState(!typeState)
  }

  const setOption = option => {
    setTypeName(option)

    optionsRef.current.style.opacity = '0'
    optionsRef.current.style.pointerEvents = 'none'
    typeIcon.current.style.transform = 'rotate(0deg)'

    setTypeState(!typeState)
  }

  return (
    <div ref={typeRef} className='type'>
      <div
        className={typeState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <p>{typeName}</p>

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
