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

  const beaconList = [
    {
      circleLat: 40,
      circleLng: -75,
    },
    {
      beaconInfo: {
        gameTitle: "Super Mario Bros. Wonder",
        miscInfo: "Let's beat the first World!\nIdk I haven't played yet",
        username: "amofro",
        console: "Switch",
        address: {
          name: "Howard Gittis Student Center",
          address: "1755 N 13th St, Philadelphia, PA 19122",
        },
        gamePic: "images/catScream.jpg",
        userPic: "images/catMonster.jpg",
        startTime: "4:30 PM",
        endTime: "7:00 PM",
        playerInfo: {
          available: 1,
          wanted: 4,
          joined: [
            {
              pic: "images/catMonster.jpg",
              username: "amofro",
              controllers: 2
            },
            {
              pic: "images/catWut.jpg",
              username: "User 2",
              controllers: 0
            },
            {
              pic: "images/catScream.jpg",
              username: "User 3",
              controllers: 1
            }
          ]
        },
        controllerInfo: {
          available: 2,
          wanted: 4,
          description: [
            "Joycons",
            "Pro Controller",
            "Gamecube Controller",
            "Idk madcatz or something... I'm wanna sleep",
          ],
        },
      },
    },
    {
      circleLat: 40.05,
      circleLng: -75.1,
      beaconInfo: {
        miscInfo: "AYYYYYY fahgettaboudit",
        username: "abkrivo",
        gamePic: "images/catWut.jpg",
        userPic: "images/catScream.jpg",
        console: "Xbox Classic",
        gameTitle: "Halo Classic",
      },
    },
  ];

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
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Warning</h2>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Be careful about sharing information.</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={() => setShowModal(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
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
                  <BeaconCreation beaconList={beaconList} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/joinbeacon/"
              element={
                isLoggedIn ? (
                  <BeaconApplication beaconList={beaconList} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <HomePage beaconList={beaconList} googleMapsApiKey={apiKey} />
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
