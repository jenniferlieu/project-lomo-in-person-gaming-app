import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import "./App.css";
import { useAuth } from "./AuthContext.js";
import Login from "./components/Login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import HomePage from "./HomePage.js";
import BeaconApplication from "./components/BeaconApplication/BeaconApplication.js";
import BeaconCreation from "./components/BeaconCreation/BeaconCreation.js";
import NavBar from "./components/NavBar/NavBar.jsx";
import ListView from './components/BeaconInfo/ListBeaconInfo.js';
import useEchoStore from "./useEchoStore.js";
import Echo from "laravel-echo"; // eslint-disable-next-line
import Pusher from "pusher-js"; // used behind the scenes by the new Echo function

function App() {
  const { isLoggedIn } = useAuth();
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // const laravelEcho = useEchoStore((state) => state.laravelEcho);
  // const setLaravelEcho = useEchoStore((state) => state.setLaravelEcho);

  // // Connect to WebSocket
  // if (!laravelEcho) {
  //   // create a new websocket connection
  //   const laravelWebsocket = new Echo({
  //     broadcaster: "pusher",
  //     key: process.env.REACT_APP_PUSHER_APP_KEY,
  //     cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  //     forceTLS: true,
  //   });

  //   // store the connection in state manager
  //   setLaravelEcho(laravelWebsocket);
  // }

  // // Display messages for websocket states
  // // More information about the available states and state lifecycle:
  // // https://pusher.com/docs/channels/using_channels/connection/#connection-states
  // if (laravelEcho) {
  //   // Initial state. No event is emitted in this state.
  //   laravelEcho.connector.pusher.connection.bind("initalized", () => {
  //     console.log("Laravel echo websocket initalized.");
  //   });

  //   // All dependencies have been loaded and Channels is trying to connect.
  //   laravelEcho.connector.pusher.connection.bind("connecting", () => {
  //     console.log("Laravel echo websocket is connecting.");
  //   });

  //   // The connection to Channels is open and authenticated with your app.
  //   laravelEcho.connector.pusher.connection.bind("connected", () => {
  //     console.log("Laravel echo websocket connected.");
  //   });

  //   // The Channels connection was previously connected and has now intentionally been closed.
  //   laravelEcho.connector.pusher.connection.bind("disconnected", () => {
  //     console.log("Laravel echo websocket disconnected.");
  //     setLaravelEcho(null);
  //   });

  //   // Channels is not supported by the browser.
  //   laravelEcho.connector.pusher.connection.bind("failed", () => {
  //     console.log(
  //       "Laravel echo websocket failed. Websockets are not supported by this browser."
  //     );
  //   });

  //   // The connection is temporarily unavailable.
  //   laravelEcho.connector.pusher.connection.bind("unavailable", () => {
  //     console.log(
  //       "Laravel echo websocket is temporarily unavailable. Please check your internet connection."
  //     );
  //   });
  // }

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn]);

  return (
    <div className="App bg-gradient-to-b from-sky-500 to-teal-600 bg-scroll h-min-full h-screen">
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle min-w-lg w-full max-w-xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-3xl text-center leading-6 font-bold text-black">Warning</h2>
                <div className="mt-2 text-xl font-semibold text-center pt-4 text-black">
                  <p>Beacons are visible to everyone</p>
                  <p>Share your address at your own risk</p>
                </div>
              </div>
              <div className="flex justify-center px-4 py-3 sm:px-6">
                <button onClick={() => setShowModal(false)} type="button" className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm mb-4 px-20 py-4 bg-sky-600 text-lg font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto">
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Router>
        <LoadScript googleMapsApiKey={apiKey} libraries={["places"]}>
          <NavBar />
          <Routes>
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
            />
            <Route 
              path='/beaconlist' 
              element={isLoggedIn ? <ListView /> : <Navigate to='/login' />} 
            />
            <Route
              path="/createbeacon"
              element={
                isLoggedIn ? (
                  <BeaconCreation />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/joinbeacon/"
              element={
                isLoggedIn ? (
                  <BeaconApplication />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </LoadScript>
      </Router>
    </div>
  );
}

export default App;
