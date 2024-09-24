import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    logo: 'poplook_logo.png',
    icon: 'PL_ICON.png',
}

export const getLogo: any = createAsyncThunk<any>(
    'logoSlice/getImage',
    async (query: any, { rejectWithValue, signal }) => {

        try {

            const response: any = await fetch(`/api/logo`, {
                signal: signal,
            });
            let result = await response.json();

            if (result) {
                return result;
            } else {
                return rejectWithValue(result.results)
            }

        } catch (error: any) {
            console.log('error', error);

            return rejectWithValue(error.message);
        }
    }
)

export const logoSlice: any = createSlice({
    name: 'logoSlice',
    initialState,
    reducers: {
        setLogoImg: (state, action) => {
            const params = action.payload;
            const currentState = current(state);
            return {
                ...state,
                logo: params.logo,
                icon: params.icon
            }
        },
    },
    extraReducers: {
        [getLogo.pending]: (state: any) => {
            // console.log('pending', state);

            // state.data = [];
            state.logo = null;
            state.icon = null;
        },
        [getLogo.fulfilled]: (state: any, { payload }) => {
            // console.log('fulfilled', payload);

            if (payload.message == 'Success') {
                state.logo = payload.data.logo;
                state.icon = payload.data.icon;
            }
            // state.data = payload;
        },
        [getLogo.rejected]: (state: any, { payload }) => {
            // console.log('rejected', payload);
            state.logo = 'poplook_logo.png';
            state.icon = 'PL_ICON.png';

        }
    }
})

export const { setLogoImg } = logoSlice.actions

export default logoSlice.reducer;