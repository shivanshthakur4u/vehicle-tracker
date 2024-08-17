import React from 'react';
import { Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097144.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Vehicle = ({ position, routeCoordinates }) => {
  const map = useMap();

  // Center the map on the vehicle's position
  map.setView(position);

  return (
    <>
      <Marker position={position} icon={vehicleIcon} />
      <Polyline positions={routeCoordinates} color="blue" />
    </>
  );
};

export default Vehicle;