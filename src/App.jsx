import { useState } from 'react'

import Header from './pages/Header';
import MainView from './pages/MainView';
import InformationModal from './pages/InformationModal';

function App() {
  const [allowFullScreen, setAllowFullScreen] = useState(false)
  const [dispSel, setDispSel] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)

  const handleDispSel = (sel) => {
    setDispSel(sel)
  }

  return (
    <div className='w-screen min-h-screen bg-blackskin-100 flex flex-col font-inte'>
      <Header 
        onHandleFullScreenMode={() => setAllowFullScreen((prev) => !prev)}
        onHandleInformationModal={() => setModalOpen((prev) => !prev)}
         />
      <MainView fullScreen={allowFullScreen} dispSelChange={handleDispSel} />
      <InformationModal open={modalOpen} dispSel={dispSel} modalHandle={() => setModalOpen((prev) => !prev)} />
    </div>
  )
}

export default App;