import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer.js';
import Login from './components/Login/Login.jsx';

function App() {
  
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}
      {/* <MapContainer/> */}

      <Login />
    </div>
  );
}

export default App;
