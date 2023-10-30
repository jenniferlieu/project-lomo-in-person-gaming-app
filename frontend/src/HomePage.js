import React from "react";
import MapContainer from "./MapContainer.js";

const HomePage = ({beaconList}) => {

  return (
    <>
      <MapContainer beaconList={beaconList} />
      {/* <BeaconInfoWindow /> */}
    </>
  );
};

export default HomePage;
