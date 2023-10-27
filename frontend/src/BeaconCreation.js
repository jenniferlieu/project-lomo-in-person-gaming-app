import React, { useState, onClose } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function BeaconCreation() {
  const [name, setState] = useState("");
  const [game, setGame] = useState("");
  const [system, setSystem] = useState("");
  const [misc, setMisc] = useState("");
  const [location, setLocation] = useState("");
  const [people, setPeople] = useState("");
  return (
    <div>
      <div class="bg-white rounded-lg w-full leading-relaxed max-w-md mx-auto shadow-lg my-5 p-2 px-2 text-left absolute">
        <tr>
        <th classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex justify-center items-center">
          <label htmlFor={"input"}>Beacon Name</label>
          <input
            id={"BeaconName"}
            type={"text"}
            value={name}
            placeholder={"Name"}
            required
            onChange={(event) => {
              setState(event.target.value);
            }}
          />
        </th>
        <th classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex p-2 justify-center items-center">
          <label htmlFor={"input2"}>Game Title</label>
          <input
            id={"BeaconGame"}
            type={"text"}
            value={game}
            placeholder={"Type Game Here"}
            required
            onChange={(event) => {
              setGame(event.target.value);
            }}
          />
        </th>
        </tr>
        <tr>
        <th classname="min-w-screen min-h-screen bg-black  bg-opacity-25 flex p-2 justify-center items-center">
          <label htmlFor={"input3"}>No. of players</label>
          <input
            id={"Players"}
            type={"text"}
            value={people}
            placeholder={"How many Players?"}
            required
            onChange={(event) => {
              setPeople(event.target.value);
            }}
          />
        </th>
        <th classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex p-2 justify-center items-center">
          <label htmlFor={"input4"}>Game System</label>
          <input
            id={"BeaconSystem"}
            type={"text"}
            value={system}
            placeholder={"Which System?"}
            required
            onChange={(event) => {
              setSystem(event.target.value);
            }}
          />
        </th>
        </tr>
        <th classname="min-w-screen min-h-screen bg-black  bg-opacity-25 flex p-2 justify-center items-center">
          <label htmlFor={"input5"}>Location</label>
          <input
            id={"Location"}
            type={"text"}
            value={location}
            placeholder={"Where to play?"}
            required
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
        </th>
        <tr>
        <th classname="min-w-screen min-h-screen border-10 bg-black bg-opacity-25 flex p-2 span-5 justify-center items-center">
          <label htmlFor={"input6"}>Misc. Info</label>
          <input
            id={"MiscInfo"}
            type={"text"}
            value={misc}
            placeholder={"Additional Details"}
            maxLength={100}
            onChange={(event) => {
              setMisc(event.target.value);
            }}
          />
        </th>
        </tr>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} classname="p-20">
            <DateTimePicker label="From: " />
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} classname="p-20">
            <DateTimePicker label="To: " />
          </LocalizationProvider>
        </div>
        <div>
          <button
            className="font-bold relative bg-red-500 py-1 px-1 rounded float-right"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="font-bold relative bg-blue-400 py-1 px-1 rounded float-right"
            onClick={onClose}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeaconCreation;
