import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import Beacon from './Beacon.js';

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
  const [mapLoaded, setMapLoaded] = useState(false);
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

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(beaconList);
  
  return (
    <div className='relative h-screen w-full'>
      <LoadScript googleMapsApiKey={apiKey}>
        <div className='absolute top-0 left-0 w-full h-full'>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={mapCenter}
            onLoad={(map) => {
              mapRef.current = map;
              setMapLoaded(true);
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
        </div>
        <Link to="/createbeacon" className="absolute top-0 left-0 m-4 z-10">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Beacon
          </button>
        </Link>
      </LoadScript>
    </div>
  );
};

export default MapContainer;
