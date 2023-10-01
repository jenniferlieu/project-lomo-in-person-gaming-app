import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '25vh',
    width: '25%',
  };

  const defaultCenter = {
    lat: 39.9812, // Your default latitude
    lng: -75.1554, // Your default longitude
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