import React, { useState } from 'react';
import { GoogleMap, LoadScript, Circle, OverlayView } from '@react-google-maps/api';
import BeaconInfo from './BeaconInfo';

const MapContainer = () => {
  const mapStyles = {
    height: '70vh',
    width: '60%',
  };

  const defaultCenter = {
    lat: 39.9812, // default latitude
    lng: -75.1554, // default longitude
  };

  const [circleColor, setCircleColor] = useState('#FF0000'); 
  const [showBeaconInfo, setShowBeaconInfo] = useState(false);

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

  const dispalyBeacon = () => {
    setShowBeaconInfo(!showBeaconInfo);
    console.log('showBeaconInfo:', showBeaconInfo);
  }

  const getPixelPositionOffset = (width, height) => ({
    x: -(width / 2),
    y: -(height / 2),
  });

  return (
    <div className='flex justify-center items-center h-screen'>
      <LoadScript
        googleMapsApiKey={apiKey}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          {showBeaconInfo && (
            <OverlayView
              position={defaultCenter}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              getPixelPositionOffset={getPixelPositionOffset}
            >
              <div className='w-96 h-48'>
                <BeaconInfo username='amofro' timeframe='noon til night' gameTitle='smashy bros' miscInfo='Ayyyyy fuggedaboutit' gamePic={'images/catWut.png'} startTime={"1:00 PM"} endTime={"4:30 PM"}/>
              </div>
            </OverlayView>
          )}
          <Circle {...circle} onClick={dispalyBeacon} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;