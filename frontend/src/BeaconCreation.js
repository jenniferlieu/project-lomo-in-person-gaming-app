import React, { useState, onClose } from "react";
import MapContainer from "./MapContainer";
import { rectangle } from "leaflet";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function BeaconCreation() {
  const [name, setState] = useState("");
  const [game, setGame] = useState("");
  const [misc, setMisc] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");
  return (
    <div>
      <div class="bg-white rounded-lg w-full leading-relaxed max-w-md mx-auto shadow-lg my-5 p-2 px-2 absolute">
        <div classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input"}>Beacon Name_</label>
          <input
            id={"BeaconName"}
            type={"text"}
            value={name}
            placeholder={"Name"}
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        </div>
        <div classname="min-w-screen min-h-screen bg-black  bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input2"}>Game Title____</label>
          <input
            id={"BeaconGame"}
            type={"text"}
            value={game}
            placeholder={"Type Game Here"}
            onChange={(event) => {
              setGame(event.target.value);
            }}
          />
        </div>
        <div classname="min-w-screen min-h-screen bg-black  bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input2"}>No. of players</label>
          <input
            id={"Players"}
            type={"text"}
            value={people}
            placeholder={""}
            onChange={(event) => {
              setPeople(event.target.value);
            }}
          />
        </div>
        <div classname="min-w-screen min-h-screen bg-black  bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input2"}>Location</label>
          <input
            id={"Location"}
            type={"text"}
            value={location}
            placeholder={""}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </div>
        <div classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input3"}>Misc. Info____</label>
          <input
            id={"MiscInfo"}
            type={"text"}
            value={misc}
            placeholder={"Additional Details"}
            onChange={(event) => {
              setMisc(event.target.value);
            }}
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="From: " />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="To: " />
        </LocalizationProvider>
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BeaconCreation;
