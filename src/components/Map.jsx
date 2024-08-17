import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import VehicleInfo from './VehicleInfo';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3097/3097144.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const VehicleMarker = ({ position, vehicleInfo, onConfigButtonClick}) => {
  const map = useMap();
  map.setView(position);
  return <Marker position={position} icon={vehicleIcon} >
    <VehicleInfo  info={vehicleInfo} onConfigButtonClick={onConfigButtonClick} />
  </Marker>;
};

const Map = ({ center, zoom, vehiclePosition, routeCoordinates, vehicleInfo, onConfigButtonClick }) => {
  
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <VehicleMarker position={vehiclePosition} vehicleInfo={vehicleInfo}  onConfigButtonClick={onConfigButtonClick}/>
      <Polyline positions={routeCoordinates} color="blue" />
    </MapContainer>
  );
};

export default Map;