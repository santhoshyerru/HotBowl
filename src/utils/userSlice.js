import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userLocation",
    initialState: {
        cityName: "Hyderabad",
        displayName: "Hyderabad, Telangana",
        latitude: "17.360589",
        longitude: "78.4740613"
    },
    reducers: {
        setUserLocation : (state, action)=>{
            state.cityName = action.payload.name
            state.displayName = action.payload.display_name
            state.latitude = action.payload.lat
            state.longitude = action.payload.lon
        }
    }
})

export const { setUserLocation } = userSlice.actions;
export default userSlice.reducer;
