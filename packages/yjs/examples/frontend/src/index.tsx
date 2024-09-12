import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { SimplePage } from './pages/Simple'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SimplePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
