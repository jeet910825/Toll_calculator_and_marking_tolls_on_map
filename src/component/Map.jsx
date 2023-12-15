import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import Routing from "./Routing";
import TollMarker from "./TollMarker";


function Map() {

  const position = [15.00, 75.00];
  return (
    <div className="map-container">
      <MapContainer center={position} zoom={4}>
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        <TollMarker />
       <Routing />
      </MapContainer>
    </div>
  );
}

export default Map;
