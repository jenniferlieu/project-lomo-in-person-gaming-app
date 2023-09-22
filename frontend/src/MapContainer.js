import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 40.7128, // Your default latitude
    lng: -74.0060, // Your default longitude
  };

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return (
    <LoadScript
      googleMapsApiKey={apiKey}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10} // Adjust the initial zoom level
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;