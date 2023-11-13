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
      className="bg-white rounded-lg w-full leading-relaxed max-w-md mx-auto shadow-lg my-5 p-2 px-2 text-left container absolute"
    >
      <h2>Beacon Name Here</h2>
      <h2>Host Name Here</h2>
      <h2>Applicant name Here</h2>

      <div>
        <label>Controllers</label>
        <input
          className="min-w-fit min-h-fit bg-white bg-opacity-25 flex p-2 justify-center items-center"
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
          className="min-w-fit min-h-fit bg-white bg-opacity-25 flex p-2 justify-center items-center"
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
