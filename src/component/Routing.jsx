import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";
import { useSelector } from "react-redux";
import { decode, encode } from "@googlemaps/polyline-codec";
import axios from "axios";
import { setData } from "../features/tollDataSlice";
import { useDispatch } from "react-redux";

export default function Test() {
  const vehicleType = useSelector(state=>state.locations.vehicleType)
  
  const dispatch = useDispatch();
  const [encoding, setEncoding] = useState("");
  const customMarkerIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
  });
  useEffect(() => {
    if (encoding.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.post(import.meta.env.VITE_URL, {
            polyline: encoding,
            vehicleType:vehicleType
          },{
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            }
          });
          dispatch(setData(response.data.data));
        } catch (error) {

          if(error.response.status===404){
            alert("reached maximum api request try it tommarrow")
          }
        }
      };
      fetchData();
    }
  }, [encoding,vehicleType]);

  const map = useMap();
  const locations = useSelector((state) => state.locations);

  // Use refs to store references to markers
  const sourceMarkerRef = useRef(null);
  const destinationMarkerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(locations.sourceLocation.lat, locations.sourceLocation.lon),
        L.latLng(
          locations.destinationLocation.lat,
          locations.destinationLocation.lon
        ),
      ],
      routeWhileDragging: false,
      addWaypoints: true,
      createMarker: () => null,
    });

    routingControl.on("routesfound", async (event) => {
      // Remove old markers
      if (sourceMarkerRef.current) {
        map.removeLayer(sourceMarkerRef.current);
      }
      if (destinationMarkerRef.current) {
        map.removeLayer(destinationMarkerRef.current);
      }

      const route = event.routes[0];
      const allCoordinates = route.coordinates;
      let newCoordinates = allCoordinates.map((coord) => [
        coord.lat,
        coord.lng,
      ]);
      setEncoding(encode(newCoordinates, 5));

      // Create and store new markers
      destinationMarkerRef.current = L.marker([
        locations.destinationLocation.lat,
        locations.destinationLocation.lon,
      ],{icon:customMarkerIcon})
        .bindPopup(
          `Destination Address: ${locations.destinationLocation.address}`
        )
        .addTo(map)
        .openPopup();
      sourceMarkerRef.current = L.marker([
        locations.sourceLocation.lat,
        locations.sourceLocation.lon,
      ],{icon:customMarkerIcon})
        .bindPopup(`Source Address: ${locations.sourceLocation.address}`)
        .addTo(map)

      map.fitBounds([
        sourceMarkerRef.current.getLatLng(),
        destinationMarkerRef.current.getLatLng(),
      ]);
    });

    routingControl.addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, locations]);

  return null;
}
