import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { geocodeLocation } from "../features/geocodeLocation";
import {
  setDestinationLocation,
  setSourceLocation,
} from "../features/searchSlice";
import "./SearchForm.css";
import { setVehicleType } from "../features/searchSlice";
function SearchForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicle,setVehicle] = useState("2AxlesAuto")
  const dispatch = useDispatch();

  const handleSourceChange = (event) => {
    setSource(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };
  const handleSearch = () => {
    dispatch(setVehicleType({vehicleType:vehicle}))
    geocodeLocation(source, setSourceLocation, dispatch);
    geocodeLocation(destination, setDestinationLocation, dispatch);
  };

  return (
    <div className="searchContainer">
      <div className="inputs">
        <label htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          value={source}
          onChange={handleSourceChange}
        />
      </div>
      <div className="inputs">
        <label htmlFor="destination">Destination:</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={handleDestinationChange}
        />
      </div>

      <select className="options" onChange={(e)=>{setVehicle(e.target.value)}}>
        <option defaultValue={"2AxlesAuto"} value={"2AxlesAuto"}>
          Car,Jeep,Van,Suv
        </option>
        <option value={"2AxlesTruck"}>Truck</option>
        <option value={"2AxlesHCMEME"}>HCM , EME</option>
        <option value={"2AxlesMotorcycle"}>Bike</option>
      </select>

      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
}

export default SearchForm;
