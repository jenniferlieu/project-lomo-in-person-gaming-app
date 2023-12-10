import React, { useRef, useState } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import Beacon from './Beacon.js';
import GetUserById from '../BeaconInfo/GetUserById.js';

const MapContainer = ({ beaconList }) => {
  const mapStyles = {
    height: '94vh',
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

  const areOverlapping = (coord1, coord2) => {
    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(coord1.lat, coord1.lng),
      new google.maps.LatLng(coord2.lat, coord2.lng)
    );
    return distance < 10; // distance in meters where you consider markers to be overlapping
  };

  const adjustPosition = (coord, index) => {
    const angle = (index * 360) / beaconList.length;
    const newCoord = google.maps.geometry.spherical.computeOffset(
      new google.maps.LatLng(coord.lat, coord.lng),
      20, // distance in meters to offset
      angle // angle in degrees to offset
    );
    return { lat: newCoord.lat(), lng: newCoord.lng() };
  };

  const adjustedBeacons = beaconList.map((beacon, index) => {
    let adjustedPosition = { lat: beacon.latitude, lng: beacon.longitude };
    beaconList.forEach((otherBeacon, otherIndex) => {
      if (index !== otherIndex && areOverlapping(adjustedPosition, otherBeacon)) {
        adjustedPosition = adjustPosition(adjustedPosition, index);
      }
    });
    return { ...beacon, adjustedPosition };
  });

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log(beaconList);
  const devUser = GetUserById("ce644f8a-be78-4f9c-b40c-bcb7a4d88bd4");
  
  return (
    <div className='absolute top-70 left-0 w-full'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={mapCenter}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        googleMapsApiKey={apiKey}
      >
        {adjustedBeacons.map((beacon, index) => (
          <Beacon
            key={index}
            id={beacon.id}
            activeBeacon={activeBeacon}
            onBeaconClick={handleBeaconClick}
            beacon={beacon}
            border_image={devUser.avatar}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
