import React, { useState, useContext } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker.js";
import { AuthContext, useAuth } from "../../AuthContext.js";
import { Link } from "react-router-dom";
// import { useHistory } from 'react-router-dom'
//import {laravelEcho} from "../laravelEcho/laravelEcho.js";
import { useEffect } from "react";
import Echo from "laravel-echo"; // eslint-disable-next-line
import Pusher from "pusher-js";

function BeaconCreation({ beaconList }) {
  const [name, setState] = useState("");
  const [game, setGame] = useState("");
  const [system, setSystem] = useState("");
  const [misc, setMisc] = useState("");
  const [location, setLocation] = useState("");
  const [players, setPlayers] = useState("");
  const [timeFrom, setFrom] = useState("");
  const [timeTo, setTo] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const { authUser } = useAuth();

  function displayText(text) {
    document.getElementById("displayArea").innerHTML = text;
    document.getElementById("displayArea").className =
      "font-bold relative bg-green-400 py-1 px-1 rounded float-right";
  }

  function clearForm() {
    setState("");
    setGame("");
    setSystem("");
    setMisc("");
    setLocation("");
    setPlayers("");
    setFrom("");
    setTo("");
  }

  useEffect(() => {
    const laravelEcho = new Echo({
      broadcaster: 'pusher',
      key: process.env.REACT_APP_PUSHER_APP_KEY,
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      forceTLS: true
    });
    console.log(laravelEcho);
    
        // Connect to a public websocket channel
        laravelEcho.channel("new-beacon").listen("BeaconCreated", (e) => {
          // runs every time data ia pushed through the websocket
          console.log(e.beacon);
        });
    
        // Cleanup function to disconnect the Echo instance when the component unmounts
        return () => {
          laravelEcho.disconnect();
        };
        
  }, []); // Empty dependency array ensures this runs on mount and unmount only

  function onClose() {
    let data = {
      // exepected json schema
      host_id: "6ae59aa7-258e-414b-b833-11c1fca69d7a", // required
      title: name, // required
      game_title: game, // required
      game_system: system, //required
      description: misc, //required
      start_date_time: timeFrom, // required
      end_date_time: timeTo, //required
      address: location, // required
      latitude: 40 + Math.random(), // required
      longitude: 73 + Math.random(), // required
      num_players: players, // required
    };
    console.log(data);

    const beaconListData = {
      circleLat: data.latitude,
      circleLng: data.longitude,
      beaconInfo: {
        username: data.host_id,
        gameTitle: data.game_title,
        console: data.game_system,
        miscInfo: data.misc,
        startTime: data.start_date_time,
        endTime: data.end_date_time,
        playerInfo: {
          wanted: data.num_players,
        },
        address: {
          address: data.address,
        },
      },
    };

    beaconList.push(beaconListData);
    console.log(beaconList);

    // history.push("/");

    // define url and headers
    let url = "https://localhost/api/beacons";
    let logindata = {
      email: "pikachu@test.com",
      password: "secret1234",
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + authUser,
      },
      body: JSON.stringify(data),
    };

    // make api call
    fetch(url, options)
      .then((response) => {
        const responseclone = response.clone();
        if (responseclone.ok) {
          displayText("Beacon Confirmed!");
          return responseclone;
        }
      })

      .then((response) => response.json())
      .then((response) => {
        console.log("response", response);
      })

      .catch((error) => console.log("error", error));
  }

  return (
    <div class="bg-white rounded-lg w-full md:w-1/2 flex-col items-center justify-center m-auto shadow-lg p-4 h-auto">
      <tr>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input"}><br/>Beacon Name<br/></label>
          <input
            className="m-auto p-1 border-2 border-teal-100"
            id={"BeaconName"}
            type={"text"}
            value={name}
            placeholder={"Name"}
            required
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        </td>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input2"}><br/>Game Title<br/></label>
          <input
            className="m-auto p-1 border-2 border-teal-100"
            id={"BeaconGame"}
            type={"text"}
            value={game}
            placeholder={"Type Game Here"}
            required
            onChange={(event) => {
              setGame(event.target.value);
            }}
          />
        </td>
      </tr>
      <tr>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input3"}> <br/>No. of players<br/></label>
          <input
            className="m-auto p-1 border-2 border-teal-100"
            id={"Players"}
            type={"number"}
            min={2}
            value={players}
            placeholder={"How many Players?"}
            required
            onChange={(event) => {
              setPlayers(event.target.value);
            }}
          />
        </td>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input4"}> <br/>Game System<br/></label>
          <input
            className="m-auto p-1 border-2 border-teal-100"
            id={"BeaconSystem"}
            type={"text"}
            value={system}
            placeholder={"Which System?"}
            required
            onChange={(event) => {
              setSystem(event.target.value);
            }}
          />
        </td>
      </tr>
      <tr>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input5"}>Location</label>
          <input
            className="m-auto p-1 border-2 border-teal-100 min-w-full"
            id={"Location"}
            type={"text"}
            value={location}
            placeholder={"Where to play?"}
            required
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </td>
      </tr>
      <tr>
        <td className="min-w-auto min-h-auto text-sky-950 p-2">
          <label htmlFor={"input6"}>Misc. Info</label>
          <input
            className="m-auto p-1 border-2 border-teal-100 w-full"
            id={"MiscInfo"}
            type={"text"}
            value={misc}
            placeholder={"Additional Details"}
            maxLength={100}
            onChange={(event) => {
              setMisc(event.target.value);
            }}
          />
        </td>
      </tr>
      <div className=" flex flex-row space-x-10 justify-left  my-3">
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} className="p-10">
            <DateTimePicker
              label="From: "
              value={timeFrom}
              onChange={(newValue) => setFrom(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} className="p-10">
            <DateTimePicker
              label="To: "
              value={timeTo}
              onChange={(newValue) => setTo(newValue)}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-3 justify-center">
        
        <Link to="/">
          <button className="font-bold relative bg-blue-400 py-1 px-1 rounded float-right">
            Close
          </button>
        </Link>
        
        <button
          className="font-bold relative bg-red-500 py-1 px-1 rounded float-right"
          onClick={clearForm}
        >
          Clear
        </button>
        <button
          className="font-bold relative bg-teal-500 py-1 px-1 rounded float-right"
          onClick={onClose}
        >
          Confirm
        </button>
        <div
          className="font-bold relative py-1 px-1 rounded float-right"
          id="displayArea"
        ></div>
      </div>
    </div>
  );
}

export default BeaconCreation;
