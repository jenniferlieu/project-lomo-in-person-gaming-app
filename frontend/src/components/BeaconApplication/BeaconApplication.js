import React, { useState, useContext } from "react";

// make controller input a dropdown?
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs.js";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker/DateTimePicker.js";
import { AuthContext, useAuth } from "../../AuthContext.js";
import { Link } from "react-router-dom";


function BeaconApplication() {
  const [controlNum, setController] = useState("");
  const [extraNotes, setNotes] = useState("");
  function clearForm() {
    setController("");
    setNotes("");
  }

/*
  const beaconListData = {
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
      controllerInfo: {
        available: data.controlNum,
        wanted: data.controlNeeded,
      }
    },
  };
*/
  function Apply() {
  
  
  }


  
  return (

    <form
      id="joinForm"
      class="bg-white rounded-lg w-full leading-relaxed max-w-md mx-auto shadow-lg my-5 p-2 px-2 text-left container absolute"
    >
        <h2>Beacon Name Here</h2>
        <h2>Host Name Here</h2>
        <h2>Applicant name Here</h2>

        
      <div>
        <label>Controllers</label>
        <input
          class="min-w-fit min-h-fit bg-white bg-opacity-25 flex p-2 justify-center items-center"
          label="Controllers"
          id={"controlNum"}
          type={"text"}
          value={controlNum}
          placeholder={"Controllers?"}
          required
          onChange={(event) => {
            setController(event.target.value);
          }}
        />
        <label>Heads Up to Host</label>
        <input
          class="min-w-fit min-h-fit bg-white bg-opacity-25 flex p-2 justify-center items-center"
          label="Heads Up to Host"
          id={"extraNotes"}
          type={"text"}
          value={extraNotes}
          placeholder={"Anything you want to tell the host?"}
          required
          onChange={(event) => {
            setNotes(event.target.value);
          }}
        />
        <button
          className="font-bold relative bg-blue-500 py-1 px-1 rounded float-right"
          onClick={Apply}
        >
          Submit
        </button>
        <button
          className="font-bold relative bg-white-500 py-1 px-1 rounded float-right"
          onClick={clearForm}
        >
          Clear
        </button>
        <button
          className="font-bold relative bg-red-500 py-1 px-1 rounded float-right"
          onClick={clearForm}
        >
          Close
        </button>
      </div>
    </form>
  );
}

export default BeaconApplication;
