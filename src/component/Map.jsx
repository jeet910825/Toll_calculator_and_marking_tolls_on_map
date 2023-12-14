import React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import Routing from "./Routing";
import TollMarker from "./TollMarker";
import Test from "./Test";

function Map() {

  const position = [15.00, 75.00];
  return (
    <div className="map-container">
      <MapContainer center={position} zoom={4}>
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
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
