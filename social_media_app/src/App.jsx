import { CssBaseline } from '@mui/material';
import './index.scss';
import SignUp from "./container/SignUp/SignUp";
import Login from "./container/Login/Login";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './container/Home/Home';
import Profile from './container/Profile/Profile';
import AuthVerify from './components/AuthVerify/AuthVerify';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/" element={!user ? <SignUp /> : <Navigate to='/lookalike/feeds' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/lookalike/feeds' element={<Home />} />
        <Route path='/lookalike/profile/:id' element={<Profile />} />
      </Routes>
      <AuthVerify />
    </>
  )
}

export default App;