import React from "react";
import MapContainer from "./components/Beacon/MapContainer.js";

const HomePage = ({beaconList}) => {

  return (
    <>
      <MapContainer beaconList={beaconList} />
      {/* <BeaconInfoWindow /> */}
    </>
  );
};

export default HomePage;
