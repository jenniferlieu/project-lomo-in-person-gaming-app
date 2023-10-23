import React from 'react';
import { Circle } from '@react-google-maps/api';
import BeaconInfoWindow from './BeaconInfoWindow';

const Beacon = ({ id, activeBeacon, onBeaconClick, beaconInfo, circleLat, circleLng }) => {
  const circle = {
    center: {
        lat: circleLat,
        lng: circleLng
      },
    radius: 2000, // Radius in meters 
    options: {
      fillColor: '#FF0000', 
      strokeColor: '#0000FF', 
      strokeOpacity: 0.8, 
      strokeWeight: 2, 
    },
  };

  const toggleDisplayBeacon = () => {
    onBeaconClick(id);
  }

  return (
    <>
      <Circle {...circle} onClick={toggleDisplayBeacon} />
      {activeBeacon === id && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[30rem]">
            <BeaconInfoWindow {...beaconInfo} onClose={toggleDisplayBeacon} />
          </div>
        </div>
      )}
    </>
  );
};

Beacon.defaultProps = {
    beaconInfo: BeaconInfoWindow.defaultProps,
    circleLat: 40.1,
    circleLng: -75.2
};

export default Beacon;