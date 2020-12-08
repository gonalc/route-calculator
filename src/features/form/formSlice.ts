import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface FormState {
    geometry: [number, number][];
    loading: boolean;
    distance: number;
    origin: string;
    destination: string;
    manualMode: boolean;
}

const initialState: FormState = {
    geometry: [],
    loading: false,
    distance: 0,
    origin: '',
    destination: '',
    manualMode: true,
}

export const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setGeometry: (state, action: PayloadAction<[number, number][]>) => {
            state.geometry = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload;
        },
        setOrigin: (state, action: PayloadAction<string>) => {
            state.origin = action.payload;
        },
        setDestination: (state, action: PayloadAction<string>) => {
            state.destination = action.payload;
        },
        setManualMode: (state, action: PayloadAction<boolean>) => {
            state.manualMode = action.payload;
        }
    }
});

export const {
    setGeometry,
    setLoading,
    setDistance,
    setOrigin,
    setDestination,
    setManualMode
} = formSlice.actions;

export const selectGeometry = (state: RootState) => state.form.geometry;
export const selectLoading = (state: RootState) => state.form.loading;
export const selectDistance = (state: RootState) => state.form.distance;
export const selectOrigin = (state: RootState) => state.form.origin;
export const selectDestination = (state: RootState) => state.form.destination;
export const selectManualMode = (state: RootState) => state.form.manualMode;

export default formSlice.reducer;
