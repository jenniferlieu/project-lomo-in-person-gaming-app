import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';
import BeaconInfo from './BeaconInfo';

const MapContainer = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [showBeaconInfo, setShowBeaconInfo] = useState(false);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef(null);

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

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  /*
    TODO:
    The circle could be in the center of the map and have the beaconInfo displayed overtop of the circle
    In this case, there is no way to unfreeze everything
    2 fixes to add:
      1) make it so that if you click on another beacon, that information will be displayed instead
      2) add a button to hide the beacon and go back to the map
    Discuss with team
*/
  const toggleDispalyBeacon = () => {
    setMapCenter(mapRef.current.getCenter());
    setShowBeaconInfo(!showBeaconInfo);
  }

  const mapOptions = {
    gestureHandling: showBeaconInfo ? 'none' : 'cooperative'
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={mapCenter}
          options={mapOptions}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {showBeaconInfo && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-96 h-48">
                <BeaconInfo />
              </div>
            </div>
          )}
          <Circle {...circle} onClick={toggleDispalyBeacon} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;