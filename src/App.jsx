import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage'
import CustomerPage from './pages/CustomerPage'

import React from 'react';

function App() {

  return (
    <>      
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/singup' element={<SignUp />} />
        <Route path='/home' element={<CustomerPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
      
    </>
  )
}

export default App
