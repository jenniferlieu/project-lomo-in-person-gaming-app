import React, { useState } from 'react';
import { Circle } from '@react-google-maps/api';
import BeaconInfo from './BeaconInfo';

const Beacon = ({ mapRef, setMapCenter }) => {
  const circle = {
    center: {
      lat: 40,
      lng: -75
    },
    radius: 2000, // Radius in meters 
    options: {
      fillColor: '#FF0000', 
      strokeColor: '#0000FF', 
      strokeOpacity: 0.8, 
      strokeWeight: 2, 
    },
  };

  const [showBeaconInfo, setShowBeaconInfo] = useState(false);

  const toggleDisplayBeacon = () => {
    setShowBeaconInfo(!showBeaconInfo);
    if (!showBeaconInfo) {
      setMapCenter(mapRef.current.getCenter());
      mapRef.current.setOptions({ gestureHandling: 'none' });
    } else {
      mapRef.current.setOptions({ gestureHandling: 'cooperative' });
    }
  }
  
  /*
  TODO: Add failsafe unfreeze via an 'X' button
  */

  return (
    <>
      <Circle {...circle} onClick={toggleDisplayBeacon} />
      {showBeaconInfo && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-48">
            <BeaconInfo />
          </div>
        </div>
      )}
    </>
  );
};

export default Beacon;