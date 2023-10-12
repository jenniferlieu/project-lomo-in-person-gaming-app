import React, { useRef, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import Beacon from './Beacon';

/*
TODO: Add a list of beacons to add to the map and add them as individual components
TODO: Make it so the beacons replace one another and unfreeze the map appropriately
*/
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
              mapRef={mapRef}
              setMapCenter={setMapCenter}
              circleLat={beacon.circleLat}
              circleLng={beacon.circleLng}
              beaconInfo={beacon.beaconInfo}
            />
          ))}
          {/* <Beacon id={1} activeBeacon={activeBeacon} onBeaconClick={handleBeaconClick} mapRef={mapRef} setMapCenter={setMapCenter} circleLat={40} circleLng={-75}/>
          <Beacon id={2} activeBeacon={activeBeacon} onBeaconClick={handleBeaconClick} mapRef={mapRef} setMapCenter={setMapCenter} beaconInfo={beaconInfo1} />
          <Beacon id={3} activeBeacon={activeBeacon} onBeaconClick={handleBeaconClick} mapRef={mapRef} setMapCenter={setMapCenter} circleLat={40.05} circleLng={-75.1} beaconInfo={beaconInfo2}/> */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapContainer;