import React from "react";
import MapContainer from "./MapContainer";

const HomePage = () => {
  const beaconList = [
    {
      circleLat: 40,
      circleLng: -75,
    },
    {
      beaconInfo: {
        miscInfo: "fahgettaboudit",
        username: "amofro",
        gamePic: "images/catScream.jpg",
        userPic: "images/catMonster.jpg",
      },
    },
    {
      circleLat: 40.05,
      circleLng: -75.1,
      beaconInfo: {
        miscInfo: "AYYYYYY fahgettaboudit",
        username: "abkrivo",
        gamePic: "images/catWut.png",
        userPic: "images/catScream.jpg",
      },
    },
  ];

  return (
    <>
      <MapContainer beaconList={beaconList} />
      {/* <BeaconInfoWindow /> */}
    </>
  );
};

export default HomePage;
