import React, { useState, useEffect, useRef } from 'react'

const Difficulty = () => {
  const [difficultyName, setDifficultyName] = useState('difficulty')
  const [difficultyState, setDifficultyState] = useState(false)
  const difficultyRef = useRef(null)
  const optionsRef = useRef(null)
  const difficultyIcon = useRef(null)

  useEffect(() => {
    const handleOutsideClick = e => {
      if (!difficultyRef.current.contains(e.target)) {
        setDifficultyState(false)
      }
    }

    if (difficultyState) {
      optionsRef.current.style.transform = 'scale(1)'
      optionsRef.current.style.pointerEvents = 'all'
      difficultyIcon.current.style.transform = 'rotate(180deg)'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      difficultyIcon.current.style.transform = 'rotate(0deg)'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [difficultyState])

  const toggleCategories = () => {
    setDifficultyState(!difficultyState)
  }

  const setOption = option => {
    setDifficultyName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    difficultyIcon.current.style.transform = 'rotate(0deg)'

    setDifficultyState(!difficultyState)
  }

  return (
    <div ref={difficultyRef} className='difficulty'>
      <div
        className={difficultyState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <p>{difficultyName}</p>

        <i ref={difficultyIcon} className='fa-solid fa-angle-down'></i>
      </div>

      <div ref={optionsRef} className='options'>
        <p className='option' onClick={() => setOption('low')}>
          Low
        </p>
        <p className='option' onClick={() => setOption('medium')}>
          Medium
        </p>
        <p className='option' onClick={() => setOption('high')}>
          High
        </p>
      </div>
    </div>
  )
}

export default Difficulty
