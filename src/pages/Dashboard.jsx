import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import MainView from './MainView';
import Matcho from './Matcho';
import Result from './Result';
import PageNotFound from './PageNotFound.jsx';
import MonopolyGame from './MonopolyGame';
import LifeTrack from './LifeTrack.jsx';

function Dashboard() {
  const [allowFullScreen, setAllowFullScreen] = useState(false)

  return (
    <div className='w-full h-full bg-blackskin-100 flex flex-col font-inte'>
      <Header onHandleFullScreenMode={() => setAllowFullScreen((prev) => !prev)} />
      <Routes>
        <Route element={<MainView fullScreen={allowFullScreen} />}>
          <Route path='/matcho' element={<Matcho />} />
          <Route path='/monopolygame' element={<MonopolyGame />} />
          <Route path='/lifetrack' element={<LifeTrack />} />
          <Route path='/result' element={<Result />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default Dashboard;