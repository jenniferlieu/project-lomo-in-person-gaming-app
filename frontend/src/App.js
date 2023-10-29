import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './AuthContext.js';
import Login from './components/Login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import HomePage from './HomePage.js';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='App'>
        <Router>
          <Routes>
            <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
            <Route path='/' element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
