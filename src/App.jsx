import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';

function App() {
  const { isSignedIn } = useAuth()
  if (isSignedIn)
    return <Dashboard />
  else
    return <Auth />
}

export default App;