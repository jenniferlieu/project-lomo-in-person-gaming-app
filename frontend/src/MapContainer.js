import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Beacon from './Beacon';

const MapContainer = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef(null);

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
          <Beacon mapRef={mapRef} setMapCenter={setMapCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;