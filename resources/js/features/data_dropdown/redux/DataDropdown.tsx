import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState: any = {
    data: [],
    categories: [],
    categories_updated_at: null,
    groups: [],
}

export const getCategory: any = createAsyncThunk<any>(
    'dataDropdown/getCategory',
    async (query: any, { rejectWithValue, signal }) => {

        // if(categories_updated_at is after 10 sec){

        // }else{
        //     return old categories;
        // }

        try {

            const response: any = await fetch(`/api/category`, {
                signal: signal,
            });
            let result = await response.json();
            // console.log('response redux', result);

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

export const getGroups: any = createAsyncThunk<any>(
    'dataDropdown/getGroups',
    async (query: any, { rejectWithValue, signal }) => {

        // if(categories_updated_at is after 10 sec){

        // }else{
        //     return old categories;
        // }

        try {

            const response: any = await fetch(`/api/group/list_group`, {
                signal: signal,
            });
            let result = await response.json();
            // console.log('response redux', result);

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

export const dataDropdown: any = createSlice({
    name: 'dataDropdown',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getCategory.pending]: (state: any) => {
            state.categories = [];
        },
        [getCategory.fulfilled]: (state: any, { payload }) => {
            // console.log('fulfilled', payload);
            state.categories = payload;
        },
        [getCategory.rejected]: (state: any, { payload }) => {
            // console.log('rejected', payload);
            state.categories = [];
        },

        [getGroups.pending]: (state: any) => {
            state.groups = [];
        },
        [getGroups.fulfilled]: (state: any, { payload }) => {
            // console.log('fulfilled', payload);
            state.groups = payload;
        },
        [getGroups.rejected]: (state: any, { payload }) => {
            // console.log('rejected', payload);
            state.groups = [];
        }
    }
})

export const { } = dataDropdown.actions

export default dataDropdown.reducer;