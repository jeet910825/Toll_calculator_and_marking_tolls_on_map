import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{},
  tolls:[]
}

export const tollSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
        state.data = action.payload;
        if(action.payload?.route?.hasTolls){
          state.tolls = action.payload.route.tolls
        }
    },
  },
});

export const {setData} = tollSlice.actions;

export default tollSlice.reducer;