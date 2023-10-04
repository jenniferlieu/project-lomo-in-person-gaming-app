import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

const MapContainer = () => {
  const mapStyles = {
    height: '25vh',
    width: '25%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [circleColor, setCircleColor] = useState('#FF0000'); 
  const [loaded, setLoaded] = useState(false);

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
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={['places']}       
      onLoad={() => setLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
        {loaded && <Circle {...circle} onClick={changeColor} />} 
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;