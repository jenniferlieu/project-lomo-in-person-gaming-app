import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// make controller input a dropdown?

function BeaconApplication({ beaconList }) {
  const [controlNum, setController] = useState("");
  const [extraNotes, setNotes] = useState("");
  const navigate = useNavigate();

  function clearForm() {
    setController("");
    setNotes("");
  }

  function Apply() {
    console.log(beaconList[1]);
    let data = {
      controllerInfo: {
        numControllers: controlNum,
      },
      playerInfo: {
        addedPlayer: 1,
      },
    };

    const beaconUpdateData = {
      beaconInfo: {
        playerInfo: {
          available: data.addedPlayer,
        },
        controllerInfo: {
          available: data.numControllers,
        },
      },
    };
    beaconList[1].beaconInfo.controllerInfo.available =
      beaconList[1].beaconInfo.controllerInfo.available + parseInt(controlNum);
    beaconList[1].beaconInfo.playerInfo.available =
      beaconList[1].beaconInfo.playerInfo.available + 1;
    console.log(beaconList[1]);
  }

  return (
    <form
      id="joinForm"
      className="bg-white rounded-lg w-full md:w-1/2 flex-col items-center justify-center m-auto shadow-lg p-3 h-auto text-sky-950"
    >
      <h1 className="text-2xl text-center">Beacon Name Here</h1>
      <h2 className='text-xl text-left'>Host Name Here</h2>
      <h3 className='text-l text-right'>Applicant name Here</h3>

      <div className="">
        <label>Controllers </label>
        <input
           className='m-1 p-1 border-2 border-teal-100'
           data-dropdown-toggle="dropdown"
          label="Controllers"
          id={"controlNum"}
          type={"number"}
          value={controlNum}
          placeholder={"Controllers?"}
          required
          onChange={(event) => {
            setController(event.target.value);
          }}
        />
        <label><br />Heads Up to Host<br /></label>
        <input
          className='m-1 p-1 border-2 border-teal-100'
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

        <Link to="/">
          <button
            className="font-bold relative bg-green-500 text-black py-1 px-1 rounded float-right"
            onClick={(event) => {
              Apply();
            }}
          >
            Submit
          </button>
        </Link>
        <button
          className="font-bold relative bg-blue-500 text-black py-1 px-1 rounded float-right"
          onClick={clearForm}
        >
          Clear
        </button>
        <Link to="/">
          <button
            className="font-bold relative bg-red-500 text-black py-1 px-1 rounded float-right"
            onClick={clearForm}
          >
            Close
          </button>
        </Link>
      </div>
    </form>
  );
}

export default BeaconApplication;
