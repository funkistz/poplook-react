import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SessionState {
    user: {} | null,
    loginLoading: boolean,
    loginFinish: boolean,
    loginErrorMessage: string,
    country: {},
    currencySign: string,
    id_lang: string,
    device_type: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string | null,
    intro: boolean,
}

const dummy = {
    id_country: "136",
    country_name: "Malaysia",
    country_iso_code: "MY",
    id_shop: "1",
    shop_url: "http://poplook.com/",
    currency_name: "Malaysian Ringgit",
    currency_iso_code: "MYR",
    currency_sign: "RM",
    country_flag: "https://poplook.com/img/flag/my.png",
}

const initialState: SessionState = {
    user: null,
    loginLoading: false,
    loginFinish: false,
    loginErrorMessage: '',
    country: dummy,
    currencySign: 'RM',
    id_lang: '1',
    device_type: 'android',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    intro: false,
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        profile: (state, action) => {
            state = {
                ...state,
                user: {
                    ...state.user,
                    newsletter: action.payload.newsletter,
                    name: action.payload.firstname,
                    lastname: action.payload.lastname,
                    email: action.payload.email
                }
            }
            return state;
        },
        intro: (state, action) => {
            console.log('action intro', action.payload)
            const temp: any = {};
            temp.intro = action.payload;
            state = { ...state, ...temp }
            return state;
        },
        assignDeviceType: (state, action) => {
            console.log('assignDeviceType', action.payload)
            const temp: any = {};
            temp.device_type = action.payload;
            state = { ...state, ...temp }
            return state;
        }
    },
    extraReducers: (builder) => {

    },
})

// Action creators are generated for each case reducer function
export const { profile, intro, assignDeviceType } = sessionSlice.actions

export const userSelector = (state: any) => state.session

export default sessionSlice.reducer