import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Style
import './styles/main.scss'

// Pages
import Select from './pages/Select/Select'
import Questions from './pages/Questions/Questions'
import Score from './pages/Score/Score'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Select />} />

          <Route exact path='/questions' element={<Questions />} />

          <Route exact path='/score' element={<Score />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
