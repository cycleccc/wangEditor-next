import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import { SimplePage } from './pages/Simple'
import { RemoteCursorsOverlayPage } from './pages/RemoteCursorOverlay'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SimplePage />} /> */}
        <Route path="/" element={<RemoteCursorsOverlayPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
)
