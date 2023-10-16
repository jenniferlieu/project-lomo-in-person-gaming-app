import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Beacon from './Beacon';

const MapContainer = ({ beaconList }) => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [activeBeacon, setActiveBeacon] = useState(null);
  const mapRef = useRef(null);

  const handleBeaconClick = (id) => {
    if (activeBeacon === id) {
      setActiveBeacon(null);
      mapRef.current.setOptions({ gestureHandling: 'cooperative' });
    } else {
      setActiveBeacon(id);
      setMapCenter(mapRef.current.getCenter());
      mapRef.current.setOptions({ gestureHandling: 'none' });
    }
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <div className='flex justify-center items-center h-screen'>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={mapCenter}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          {beaconList.map((beacon, index) => (
            <Beacon
              key={index}
              id={index}
              activeBeacon={activeBeacon}
              onBeaconClick={handleBeaconClick}
              circleLat={beacon.circleLat}
              circleLng={beacon.circleLng}
              beaconInfo={beacon.beaconInfo}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;