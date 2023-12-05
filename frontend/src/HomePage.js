import React from "react";
import MapContainer from "./components/Beacon/MapContainer.js";
import GetBeaconInfo from "./components/BeaconInfo/GetBeaconInfo.js";

const HomePage = ({beaconList}) => {
  const beaconList2 = GetBeaconInfo();
  console.log("Home Page Beacon list");
  console.log(beaconList2)

  return (
    <>
      <MapContainer beaconList={beaconList2} />
      {/* <BeaconInfoWindow /> */}
    </>
  );
};

export default HomePage;
