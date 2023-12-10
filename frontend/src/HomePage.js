import React from "react";
import MapContainer from "./components/Beacon/MapContainer.js";
import GetBeaconInfo from "./components/BeaconInfo/GetBeaconInfo.js";

const HomePage = () => {
  const beaconList = GetBeaconInfo();
  console.log("Home Page Beacon list");
  console.log(beaconList)

  return (
    <>
      <MapContainer beaconList={beaconList} />
    </>
  );
};

export default HomePage;
