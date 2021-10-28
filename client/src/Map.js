import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import {  pinIcon  } from './pinicon.js';

const Map = ({lat,lng,ip}) => {
    
    return (
        <div id="mapid">
        <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]} >
                <Popup>
                Here's the IP {ip}.
                </Popup>
            </Marker>
        </MapContainer>
    </div>
    )
}

export default Map
