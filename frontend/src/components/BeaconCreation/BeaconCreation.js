import React, { useState, useContext, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker.js";
import { useAuth } from "../../AuthContext.js";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Echo from "laravel-echo";
// import { useHistory } from 'react-router-dom'
import useEchoStore from "../../useEchoStore.js";
import LocationSearch from "./LocationSearch.js";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import GetGameByName from "./GetGameByName.js";
// import {
//     Combobox,
//     ComboboxInput,
//     ComboboxPopover,
//     ComboboxList,
//     ComboboxOption,
// } from "@reach/combobox";
// import "@reach/combobox/styles.css"

function BeaconCreation({ beaconList }) {
  const [game, setGame] = useState(""); //game_title
  const [gameConsole, setConsole] = useState(""); //console
  const [description, setDesc] = useState(""); //description
  const [placeName, setPlaceName] = useState(""); //place_name
  const [address, setAddress] = useState(""); //address_street
  const [players, setPlayers] = useState(""); //player_wanted
  const [timeFrom, setFrom] = useState(""); //start_date_time
  const [timeTo, setTo] = useState(""); //end_date_time
  const [controllers, setControllers] = useState(""); //controllers_wanted
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

  const config = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // const PlacesAutocomplete = ({ setSelected }) => {
  //     const {
  //         ready,
  //         value,
  //         setValue,
  //         suggestions: { status, data },
  //         clearSuggestions,
  //     } = usePlacesAutocomplete();

  //     const handleSelect = async (value) => {
  //         setValue(location, false);
  //         clearSuggestions();

  //         const results = await getGeocode({ location });
  //         const { lat, lng } = await getLatLng(results[0]);
  //         setSelected({ lat, lng });
  //     }
  //     return (
  //         <Combobox onSelect={handleSelect}>
  //             <ComboboxInput
  //                 value={location}
  //                 onChange={(event) => setLocation(event.target.value)}
  //                 disabled={!ready}
  //                 className="combobox-input"
  //                 placeholder="Search address"
  //             />
  //             <ComboboxPopover>
  //                 <ComboboxList>
  //                     {status === "OK" &&
  //                         data.map(({ place_id, description }) => (
  //                             <ComboboxOption key={place_id} value={description} />
  //                         ))}
  //                 </ComboboxList>
  //             </ComboboxPopover>
  //         </Combobox>
  //     );
  // };
  //   const laravelEcho = useEchoStore((state) => state.laravelEcho);

  //   {  DataFields
  //     console
  //     controllers_wanted
  //     created_at
  //     description
  //     end_date_time
  //     game_image
  //     game_title
  //     host_id
  //     id
  //     latitude
  //     longitude
  //     place_name
  //     players_wanted
  //     start_date_time
  //     street_address
  //     updated_at
  //   }

  function displayText(text) {
    document.getElementById("displayArea").innerHTML = text;
    document.getElementById("displayArea").className =
      "font-bold relative bg-green-400 py-1 px-1 rounded float-right";
  }

  function clearForm() {
    setGame("");
    setDesc("");
    setConsole("");
    setPlayers("");
    setControllers("");
    setPlaceName("");
    setFrom("");
    setTo("");
  }
  //   // Uncomment this section when you're done!
  //   useEffect(() => {
  //       const laravelEcho = new Echo({
  //           broadcaster: 'pusher',
  //           key: process.env.REACT_APP_PUSHER_APP_KEY,
  //           cluster: process.env.REACT_APP_PUSHER_CLUSTER,
  //           forceTLS: true
  //       });
  //       console.log(laravelEcho);

  //       // Connect to a public websocket channel
  //       laravelEcho.channel("new-beacon").listen("BeaconCreated", (e) => {
  //           // runs every time data ia pushed through the websocket
  //           console.log(e.beacon);
  //       });

  //       // Cleanup function to disconnect the Echo instance when the component unmounts
  //       return () => {
  //           laravelEcho.disconnect();
  //       };

  //   }, []); // Empty dependency array ensures this runs on mount and unmount only

  function onClose() {
    let data = {
      console: gameConsole,
      controllers_wanted: controllers,
      description: description,
      end_date_time: timeTo,
      game_title: game,
      host_id: userId,
      place_name: placeName,
      players_wanted: players,
      start_date_time: timeFrom,
      street_address: address,
      latitude: "39.981985",
      longitude: "-75.155562",
    };
    console.log(data);

    // const beaconListData = {
    //     circleLat: data.latitude,
    //     circleLng: data.longitude,
    //     beaconInfo: {
    //         username: data.host_id,
    //         gameTitle: data.game_title,
    //         console: data.game_system,
    //         miscInfo: data.misc,
    //         startTime: data.start_date_time,
    //         endTime: data.end_date_time,
    //         playerInfo: {
    //             wanted: data.num_players,
    //         },
    //         address: {
    //             address: data.address,
    //         },
    //     },
    // };

    // beaconList.push(beaconListData);
    // console.log(beaconList);

    // history.push("/");

    // define url and headers
    let url = "http://localhost/api/beacons";
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

  const [selected, setSelected] = useState(null);
  //   const games = GetGameByName("mario wonder", authUser);
  return (
    <div className="border-box bg-white rounded-lg w-11/12 md:w-2/3 flex-col items-center justify-center my-2 md:my-10 m-auto shadow-lg p-4 h-auto text-sky-950">
      <div className="font-bold text-2xl border-b-4 border-b-sky-950 pb-2 w-full mb-2">
        What
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex-col w-full p-1 md:p-2">
          Game Name:
          <input
            value={gameName}
            onChange={handleInputChange}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="What are we playing?"
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
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
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#ddd")
                }
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
                className="flex items-center my-2"
              >
                <img
                  src={game.cover ? game.cover.url : "images/catScream.jpg"}
                  alt={game.name}
                  className="h-[4.5rem] w-[4.5rem]"
                />
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
            value={controllers}
            onChange={(e) => {
              setControllers(e.target.value);
            }}
            placeholder="How many controllers are needed?"
            className="p-1 border-teal-100 border-2 rounded w-full"
          />
        </div>
      </div>

      <div className="font-bold text-2xl border-b-4 border-b-sky-950 py-2 w-full mb-2">
        Where
      </div>

      <div className="flex-col w-full p-1 md:p-2">
        Location:
        <LocationSearch />
      </div>

      <div className="font-bold text-2xl border-b-4 border-b-sky-950 py-2 w-full mb-2">
        When
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 place-content-center">
        <div className="p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="From: "
              value={timeFrom}
              onChange={(newValue) => setFrom(newValue)}
              className="w-full"
            />
          </LocalizationProvider>
        </div>
        <div className="p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="To: "
              value={timeTo}
              onChange={(newValue) => setTo(newValue)}
              className="w-full"
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-3 justify-center">
        <Link to="/">
          <button className="font-bold relative bg-sky-400 py-1 px-1 rounded">
            Close
          </button>
        </Link>

        <button
          className="font-bold relative bg-red-500 py-1 px-1 rounded"
          onClick={clearForm}
        >
          Clear
        </button>
        <button
          className="font-bold  bg-teal-500 py-1 px-1 rounded"
          onClick={onClose}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default BeaconCreation;
