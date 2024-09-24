import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
    sideBarOpen: boolean,
    allHidden: boolean,
}

const initialState: SessionState = {
    sideBarOpen: true,
    allHidden: false,
}

export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        sideBarAction: (state, action) => {
            // console.log('action sideBarOpen', action.payload)
            const temp: any = {};
            temp.sideBarOpen = action.payload;
            state = { ...state, ...temp }
            return state;
        },
    },
    extraReducers: (builder) => {

    },
})

// Action creators are generated for each case reducer function
export const { sideBarAction } = appStateSlice.actions

export const userSelector = (state: any) => state.session

export default appStateSlice.reducer