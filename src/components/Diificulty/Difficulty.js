import React, { useState, useEffect, useRef } from 'react'

const Difficulty = () => {
  const [difficultyName, setDifficultyName] = useState('difficulty')
  const [difficultyState, setDifficultyState] = useState(false)
  const difficultyRef = useRef(null)
  const optionsRef = useRef(null)
  const difficultyIcon = useRef(null)
  const nameRef = useRef(null)

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
      nameRef.current.style.top = '-0.55rem'
      nameRef.current.style.fontSize = '0.7rem'
    } else {
      optionsRef.current.style.transform = 'scale(0)'
      optionsRef.current.style.pointerEvents = 'none'
      difficultyIcon.current.style.transform = 'rotate(0deg)'
      nameRef.current.style.top = '0.5rem'
      nameRef.current.style.fontSize = '0.9rem'
    }

    // Adding click event listener
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [difficultyState])

  const toggleCategories = () => {
    setDifficultyState(!difficultyState)
    setDifficultyName('difficulty')
  }

  const setOption = option => {
    setDifficultyName(option)

    optionsRef.current.style.transform = 'scale(0)'
    optionsRef.current.style.pointerEvents = 'none'
    difficultyIcon.current.style.transform = 'rotate(0deg)'
    nameRef.current.style.top = '0.5rem'
    nameRef.current.style.fontSize = '0.9rem'

    setDifficultyState(!difficultyState)
  }

  return (
    <div ref={difficultyRef} className='difficulty'>
      <div
        className={difficultyState ? 'input blueBorder' : 'input greyBorder'}
        onClick={() => toggleCategories()}
      >
        <p
          ref={nameRef}
          className={difficultyState ? 'blueColor' : 'greyColor'}
        >
          {difficultyName}
        </p>

        <i
          ref={difficultyIcon}
          className={
            difficultyState
              ? ' fa-solid fa-angle-down blueColor'
              : ' fa-solid fa-angle-down greyColor'
          }
        ></i>
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
