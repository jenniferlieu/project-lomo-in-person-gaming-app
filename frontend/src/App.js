import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import HomePage from './HomePage.js';



function App() {
  return (
    <Routes>
      <div className='App'>
        <Route exact path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup /> } />
      </div>
    </Routes>
  );
}

export default App;
