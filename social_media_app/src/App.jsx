import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import Components from '.';

import { CssBaseline } from '@mui/material';

import './index.scss';
import { Suspense} from 'react';

const App = () => {
  const isLoading = useSelector((state) => state.users.isLoading);
  const user = JSON.parse(localStorage.getItem('profile'));
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CssBaseline />
      <Suspense fallback={<div>Loading.........</div>}>
        <Routes>
          <Route path="/" element={<Navigate to='/signup' />} />
          <Route path='/lookalike/feeds' element={!user ? <Navigate to='/' /> : <Components.Home />} />
          <Route path='/lookalike/profile/:id' element={!user ? <Navigate to='/' /> : <Components.Profile />} />
          <Route path='/signup' element={!user ? <Components.SignUp /> : <Navigate to='/lookalike/feeds' />} />
          <Route path='/login' element={<Components.Login />} /> 
          <Route path='/lookalike/chat' element={!user ? <Navigate to='/' /> : <Components.ChatBox />} />
          <Route path='/lookalike/chat/:id' element={!user ? <Navigate to='/' /> : <Components.ChatBox />} />
        </Routes>
        <Components.AuthVerify />
      </Suspense>
    </>
  )
}

export default App;