import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sourceLocation: {
    address: "",
    lat: "",
    lon: "",
  },
  destinationLocation: {
    address: "",
    lat: "",
    lon: "",
  },
  polyline:"",
  vehicleType:"",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setSourceLocation: (state, action) => {
      state.sourceLocation = {
        address: action.payload.address,
        lat: action.payload.lat,
        lon: action.payload.lon,
      };
    },
    setDestinationLocation: (state, action) => {
      state.destinationLocation= {
        address: action.payload.address,
        lat: action.payload.lat,
        lon: action.payload.lon,
      };
    },
    setVehicleType:(state,action)=>{
      state.vehicleType = action.payload.vehicleType
    }
    
  },
});


export const { setSourceLocation ,setDestinationLocation,setVehicleType } = counterSlice.actions;

export default counterSlice.reducer;
