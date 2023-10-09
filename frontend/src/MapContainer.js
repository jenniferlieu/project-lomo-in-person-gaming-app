import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '35vh',
    width: '50%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [circleColor, setCircleColor] = useState('#FF0000'); 

  const circle = {
    center: defaultCenter,
    radius: 2000, // Radius in meters 
    options: {
      fillColor: circleColor, 
      strokeColor: '#0000FF', 
      strokeOpacity: 0.8, 
      strokeWeight: 2, 
    },
  };

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const changeColor = () => { 
    const newColor = circleColor === '#FF0000' ? '#00FF00' : '#FF0000';
    setCircleColor(newColor);
  };

  return (
    <div className='flex justify-center'>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
        {<Circle {...circle} onClick={changeColor} />} 
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;