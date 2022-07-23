import React from 'react'
import useAxios from '../../hooks/useAxios'

const Questions = () => {
  let apiUrl = `/api.php?amount=10`

  const { response, loading } = useAxios({ url: apiUrl })
  console.log(response)

  return (
    <div className='questions'>
      <div className='questions__inner'>
        <h2>question 1</h2>
        <h4>this is question?</h4>
        <div className='answers'>
          <p>answer 1</p>
          <p>answer 2</p>
          <p>answer 3</p>
          <p>answer 4</p>
        </div>

        <div className='score'>
          <p>
            <span>Score :</span> 2 / 6
          </p>
        </div>
      </div>
    </div>
  )
}

export default Questions
