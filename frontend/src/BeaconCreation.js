import React, { useState } from "react";
import MapContainer from "./MapContainer";
import { rectangle } from "leaflet";

function BeaconCreation() {
  const [state, setState] = useState("");

  return (
    <div>
    <div classname="min-w-screen min-h-screen bg-black bg-opacity-25 flex justify-center items-center">
      <label htmlFor={"input"}>Beacon Name</label>
      <input
        id={"input"}
        type={"text"}
        value={state}
        placeholder={"hello"}
        onChange={(event) => {
          setState(event.target.value);
        }}
      />
    </div>
    </div>
  );
}

export default BeaconCreation;
