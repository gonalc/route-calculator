import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface MapState {
    lat: number;
    lng: number;
    zoom: number;
};

const initialState: MapState = {
    lng: 40.113143,
    lat: -3.29611,
    zoom: 2,
};

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
    }
});


export const selectMap = (state: RootState) => state.map;

export default mapSlice.reducer;
