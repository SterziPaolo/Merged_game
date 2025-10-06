import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

import './index.css'

import Matcho from './pages/Matcho'
import Result from './pages/Result'
import IframeView from './components/core/IframeView.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </BrowserRouter>
)
