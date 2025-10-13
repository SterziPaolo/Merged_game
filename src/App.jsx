import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import Header from './pages/Header';
import MainView from './pages/MainView';
import Matcho from './pages/Matcho'
import Result from './pages/Result'
import IframeView from './components/core/IframeView.jsx'
import PageNotFound from './pages/PageNotFound.jsx';
import MonopolyGame from './pages/MonopolyGame';

function App() {
  const [allowFullScreen, setAllowFullScreen] = useState(false)

  return (
    <div className='w-screen min-h-screen bg-blackskin-100 flex flex-col font-inte'>
      <Header onHandleFullScreenMode={() => setAllowFullScreen((prev) => !prev)} />
      <Routes>
        <Route element={<MainView fullScreen={allowFullScreen} />}>
          <Route path='/matcho' element={<Matcho />} />
          <Route path='/result' element={<Result />} />
          <Route path='/monopolygame' element={<MonopolyGame />} />
          <Route path='/iframes/:id' element={<IframeView />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App;