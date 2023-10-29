import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './AuthContext.js';
import Login from './components/Login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import HomePage from './HomePage.js';
import BeaconCreation from './components/BeaconCreation/BeaconCreation.js';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className='App bg-gradient-to-tl from-[#10021e] to-[#210210] h-screen'>
        <Router>
          <Routes>
            <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
            {/* <Route path='/createbeacon' element={<BeaconCreation />} /> */}
            <Route path='/' element={isLoggedIn ? <BeaconCreation /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
