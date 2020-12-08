import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';
import { RootState } from '../../app/store';

interface FormState {
    geometry: [number, number][];
    loading: boolean;
}

const initialState: FormState = {
    geometry: [],
    loading: false,
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
        }
    }
});

export const { setGeometry, setLoading } = formSlice.actions;

export const selectGeometry = (state: RootState) => state.form.geometry;
export const selectLoading = (state: RootState) => state.form.loading;

export default formSlice.reducer;
