import React from "react";
import { Circle, Marker } from "@react-google-maps/api";
import BeaconInfoWindow from "./InfoWindow/BeaconInfoWindow.js";

const Beacon = ({ id, activeBeacon, onBeaconClick, beacon, border_image, adjustedPosition }) => {
  const circle = {
    center: {
      lat: adjustedPosition.lat,
      lng: adjustedPosition.lng,
    },
    radius: 250, // Radius in meters
    options: {
      fillColor: "#FF0000",
      strokeColor: "#0000FF",
      strokeOpacity: 0.8,
      strokeWeight: 2,
    },
  };

  const toggleDisplayBeacon = () => {
    onBeaconClick(id);
  };

  return (
    <>
    <Marker
        position={{ lat: adjustedPosition.lat, lng: adjustedPosition.lng }}
        onClick={toggleDisplayBeacon}
        icon={{
          url: border_image,
          scaledSize: new window.google.maps.Size(80, 80), // size of the icon
          anchor: new window.google.maps.Point(40, 40), // anchor point of the icon
        }}
      />
      <Marker
        position={{ lat: adjustedPosition.lat, lng: adjustedPosition.lng }}
        onClick={toggleDisplayBeacon}
        icon={{
          url: beacon.game_image,
          scaledSize: new window.google.maps.Size(75, 75), // size of the icon
          anchor: new window.google.maps.Point(37.5, 37.5), // anchor point of the icon
        }}
      />
      {activeBeacon === id && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-screen max-w-[30rem]">
            <BeaconInfoWindow
              {...beacon}
              onClose={toggleDisplayBeacon}
              id={id}
            />
          </div>
        </div>
      )}
    </>
  );
};

Beacon.defaultProps = {
  beaconInfo: BeaconInfoWindow.defaultProps,
  circleLat: 40.1,
  circleLng: -75.2,
};

export default Beacon;
