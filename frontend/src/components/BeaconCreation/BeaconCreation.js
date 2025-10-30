import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker.js";
import { useAuth } from "../../AuthContext.js";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import LocationSearch from "./LocationSearch.js";
import { useLoadScript } from "@react-google-maps/api";
import GetGameByName from "./GetGameByName.js";

function BeaconCreation() {
  const [game, setGame] = useState(""); //game_title
  const [gameConsole, setConsole] = useState(""); //console
  const [description, setDesc] = useState(""); //description
  const [placeName, setPlaceName] = useState(""); //place_name
  const [address, setAddress] = useState(""); //address_street
  const [latitude, setLatitude] = useState(""); // latitude
  const [longitude, setLongitude] = useState(""); // longitude
  const [players, setPlayers] = useState(""); //player_wanted
  const [timeFrom, setFrom] = useState(""); //start_date_time
  const [timeTo, setTo] = useState(""); //end_date_time
  const [totalControllers, setTotalControllers] = useState(""); //controllers_wanted
  const [hostControllers, setHostControllers] = useState(""); // how many controllers the host has
  const [statusCode, setStatusCode] = useState(null);
  const { authUser, userId } = useAuth();
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [gameName, setGameName] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);
  const [clickedGameId, setClickedGameId] = useState(null);
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (e) => {
    const gameNameValue = e.target.value;
    setGameName(gameNameValue);
    fetchGame(gameNameValue);
    console.log("selected game", selectedGame);
  };

  const fetchGame = debounce(async (gameName) => {
    if (gameName) {
      // check if gameName is not empty
      const results = await GetGameByName(gameName, authUser);
      setAutocompleteResults(results);
    } else {
      setAutocompleteResults([]); // clear the results if gameName is empty
    }
  }, 300); // 300ms delay

  const getLocation = (locationObj) => {
    console.log("getLocation() - locationObj", locationObj);
    setPlaceName(locationObj.name);
    setAddress(locationObj.formattedAddress);
    setLatitude(locationObj.coords.lat());
    setLongitude(locationObj.coords.lng());
  };

  const config = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  function displayText(text) {
    document.getElementById("displayArea").innerHTML = text;
    document.getElementById("displayArea").className = "font-bold relative bg-green-400 py-1 px-1 rounded float-right";
  }

  function clearForm() {
    setGameName("");
    setSelectedGame(null);
    setDesc("");
    setConsole("");
    setPlayers("");
    setTotalControllers("");
    setPlaceName("");
    setLatitude("");
    setLongitude("");
    setFrom("");
    setTo("");
  }

  function onClose() {
    let data = {
      host_id: userId,
      game_title: selectedGame.name,
      game_image: selectedGame.image,
      console: gameConsole,
      description: description,
      start_date_time: timeFrom,
      end_date_time: timeTo,
      place_name: placeName,
      street_address: address,
      latitude: latitude,
      longitude: longitude,
      players_wanted: players,
      controllers_wanted: totalControllers,
      controllers_brought: hostControllers,
    };
    console.log(data);

    // define url and headers
    let url = `{process.env.REACT_APP_BACKEND}/api/beacons`;
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
      .then((response) =>
        response.json().then((data) => {
          console.log("Attempt post beacon api, result", data);
          if (response.ok) {
            displayText("Beacon Confirmed!");
          }
        })
      )
      .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="border-box bg-white rounded-lg w-11/12 md:w-2/3 flex-col items-center justify-center my-2 md:my-10 m-auto shadow-lg p-4 h-auto text-sky-950">
      <div className="font-bold text-2xl border-b-4 border-b-sky-950 pb-2 w-full mb-2">What</div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-col w-full p-1 md:p-2">
          Game Name:
          <input value={gameName} onChange={handleInputChange} onFocus={() => setInputFocused(true)} onBlur={() => setInputFocused(false)} placeholder="What are we playing?" className="p-1 border-teal-100 border-2 rounded w-full" />
          {isInputFocused &&
            autocompleteResults.map((game) => (
              <div
                key={game.id}
                onMouseDown={() => {
                  console.log("Game object:", game);
                  setSelectedGame({
                    name: game.name,
                    image: game.cover ? game.cover.url : "images/catScream.jpg",
                  });
                  setClickedGameId(game.id);
                  setGameName(game.name);
                  setInputFocused(false);
                }}
                style={{
                  cursor: "pointer",
                  transition: "0.3s",
                  animation: game.id === clickedGameId ? "flash 0.5s" : "none",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ddd")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
                className="flex items-center my-2">
                <img src={game.cover ? game.cover.url : "images/catScream.jpg"} alt={game.name} className="h-[4.5rem] w-[4.5rem]" />
                <p>{game.name}</p>
              </div>
            ))}
        </div>
        <div className="flex-col w-full p-1 md:p-2">
          Game Console:
          <input
            value={gameConsole}
            onChange={(e) => {
              setConsole(e.target.value);
            }}
            placeholder="What are we playing on?"
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
        </div>
      </div>

      <div className="flex-col w-full p-1 md:p-2">
        Description:
        <textarea
          value={description}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          placeholder="Try typing something attention-grabbing..."
          className="p-1 border-teal-100 border-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-col w-full p-1 md:p-2">
          Players:
          <input
            value={players}
            onChange={(e) => {
              setPlayers(e.target.value);
            }}
            placeholder="How many people are playing?"
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
        </div>
        <div className="flex-col w-full p-1 md:p-2">
          Controllers:
          <input
            value={totalControllers}
            onChange={(e) => {
              setTotalControllers(e.target.value);
            }}
            placeholder="How many are needed?"
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
          <input
            value={hostControllers}
            onChange={(e) => {
              setHostControllers(e.target.value);
            }}
            placeholder="How many do you have?"
            className="p-1 mt-2 border-teal-100 border-2 rounded w-full"
          />
        </div>
      </div>

      <div className="font-bold text-2xl border-b-4 border-b-sky-950 py-2 w-full mb-2">Where</div>

      <div className="flex-col w-full p-1 md:p-2">
        Location:
        <LocationSearch returnValue={getLocation} />
      </div>

      <div className="font-bold text-2xl border-b-4 border-b-sky-950 py-2 w-full mb-2">When</div>

      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center">
        <div className="p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="From: " value={timeFrom} onChange={(newValue) => setFrom(newValue)} className="w-full" />
          </LocalizationProvider>
        </div>
        <div className="p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker label="To: " value={timeTo} onChange={(newValue) => setTo(newValue)} className="w-full" />
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-3 justify-center">
        <Link to="/">
          <button className="font-bold relative bg-sky-400 py-1 px-1 rounded">Close</button>
        </Link>

        <button className="font-bold relative bg-red-500 py-1 px-1 rounded" onClick={clearForm}>
          Clear
        </button>
        <button className="font-bold  bg-teal-500 py-1 px-1 rounded" onClick={onClose}>
          Confirm
        </button>
        <div className="font-bold relative py-1 px-1 rounded float-right" id="displayArea"></div>
      </div>
    </div>
  );
}

export default BeaconCreation;
