import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer.js';
import Login from './components/Login/Login.jsx';
import Signup from './components/signup/Signup.jsx';
import HomePage from './HomePage.js';



function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' Component={HomePage}/>
          <Route path='/login' Component={Login}/>
          <Route path='/signup' Component={Signup}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
