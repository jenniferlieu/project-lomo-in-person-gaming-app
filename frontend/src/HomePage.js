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
        gameTitle: "Super Mario Bros. Wonder",
        miscInfo: "Let's beat the first World!\nIdk I haven't played yet",
        username: "amofro",
        address: {
          name: "Howard Gittis Student Center",
          address: "1755 N 13th St, Philadelphia, PA 19122"
        },
        gamePic: "images/catScream.jpg",
        userPic: "images/catMonster.jpg",
        startTime: "4:30 PM",
        endTime: "7:00 PM",
        playerInfo: {
          available: 1,
          wanted: 4
        },
        controllerInfo: {
          available: 2,
          wanted: 4
        }
      },
    },
    {
      circleLat: 40.05,
      circleLng: -75.1,
      beaconInfo: {
        miscInfo: "AYYYYYY fahgettaboudit",
        username: "abkrivo",
        gamePic: "images/catWut.jpg",
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
