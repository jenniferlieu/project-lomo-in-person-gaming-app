import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import GetUserById from "../BeaconInfo/GetUserById.js";
import { useAuth } from "../../AuthContext.js";


function BeaconApplication() {
  const queryParams = new URLSearchParams(useLocation().search);
  const beaconId = queryParams.get('beacon_id');
  const gameTitle = queryParams.get('game_title');
  const hostUsername = queryParams.get('host_username');

  const [controlNum, setController] = useState("");
  const { authUser, userId, userEmail, userPassword } = useAuth();
  const userInfo = GetUserById(userId);

  console.log('beacon id received: ', beaconId);

  function clearForm() {
    setController("");
  }

  function Apply() {
    let data = {
      controllers_wanted: controlNum,
      attendees: {
        userInfo
      }
    };
    // define url and headers
    let url = `http://localhost/api/beacons/${beaconId}`;
    let logindata = {
      email: userEmail,
      password: userPassword,
    };
    let options = {
      method: "PATCH",
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
          // displayText("Beacon Update Confirmed!");
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
    <form
      id="joinForm"
      className="bg-white rounded-lg w-full md:w-1/2 flex-col items-center justify-center m-auto shadow-lg p-3 h-auto text-sky-950 z-30"
    >
      <h1 className="text-2xl text-center">{gameTitle}</h1>
      <h2 className='text-xl text-left'>{hostUsername}</h2>
      <h3 className='text-l text-left'>{userInfo.username}</h3>

      <div className="">
        <label><br />Controllers <br /></label>
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
          <Link to="/">
            <button
              className="font-bold  bg-teal-500 py-1 px-1 rounded"
              onClick={Apply}
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}

export default BeaconApplication;
