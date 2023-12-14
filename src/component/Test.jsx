import { useEffect, useState } from "react";
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
  const tollData = useSelector(state=>state.tollData)
  const dispatch = useDispatch();
  const [encoding,setEncoding] = useState('')

  useEffect(()=>{
    if(encoding.length>0){
     const fetchData = async() =>{
      try {
        const response = await axios.post("http://localhost:3000/",{polyline:encoding});
        console.log(response.data.data)
        dispatch(setData(response.data.data))
      } catch (error) {
        console.log("error")
      }
     }
     fetchData()
    }
  },[encoding])

  const map = useMap();
  const sourceLocation = useSelector((state) => state.locations.sourceLocation);
  const destinationLocation = useSelector(
    (state) => state.locations.destinationLocation
  );
  const chages = useSelector(state=>state.locations)

  useEffect(() => {
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

   
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(sourceLocation.lat, sourceLocation.lon),
        L.latLng(destinationLocation.lat, destinationLocation.lon),
      ],
      routeWhileDragging: false,
      addWaypoints:false,
      createMarker:()=>{return null}
    });

    routingControl.on("routesfound", async (event) => {
      const route = event.routes[0];
      const allCoordinates = route.coordinates;
      let newCoordinates = allCoordinates.map((coord) => [
        coord.lat,
        coord.lng,
      ]);
      setEncoding(encode(newCoordinates,5))
      const destinationMarker = L.marker([
        destinationLocation.lat,
        destinationLocation.lon,
      ])
        .bindPopup(`Destination Address: ${destinationLocation.address}`)
        .addTo(map);
      const sourceMarker = L.marker([
        sourceLocation.lat,
        sourceLocation.lon,
      ]).bindPopup(`Source Address: '${sourceLocation.address}`).addTo(map)
  
      map.fitBounds([sourceMarker.getLatLng(), destinationMarker.getLatLng()]);
    
    });
   
    
    routingControl.addTo(map);
    return () => {
      map.removeControl(routingControl);
    };
  }, [map,chages]);

  return null;
}
