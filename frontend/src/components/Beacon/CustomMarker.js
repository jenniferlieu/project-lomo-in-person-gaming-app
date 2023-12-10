import React from "react";
import { Marker } from "@react-google-maps/api";

const CustomMarker = ({ beacon, toggleDisplayBeacon }) => {
  return (
    <div className="rounded-full">
      <Marker
        position={{ lat: beacon.latitude, lng: beacon.longitude }}
        onClick={toggleDisplayBeacon}
        icon={{
          url: beacon.game_image,
          scaledSize: new window.google.maps.Size(70, 70), // size of the icon
          anchor: new window.google.maps.Point(35, 35), // anchor point of the icon
        }}
      />
    </div>
  );
};

export default CustomMarker;