import React, { useState } from 'react'

import Header from './pages/Header';
import MainView from './pages/MainView';

function App() {
  const [allowFullScreen, setAllowFullScreen] = useState(false)

  return (
    <div className='w-screen min-h-screen bg-blackskin-100 flex flex-col font-inte'>
      <Header onHandleFullScreenMode={() => setAllowFullScreen((prev) => !prev)} />
      <MainView fullScreen={allowFullScreen} />
    </div>
  )
}

export default App;