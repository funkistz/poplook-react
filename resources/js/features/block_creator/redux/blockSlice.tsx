import { createSlice, current } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultResource, defaultNavigationListResource } from "../values";

const initialState: any = {
    block: null,
    activeParent: null,
    activeChild: null,
    shop: 1,
    previewSize: 80,
}

export const getCategory: any = createAsyncThunk<any>(
    'blockSlice/getCategory',
    async (query: any, { rejectWithValue, signal }) => {

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
    })

export const blockSlice: any = createSlice({
    name: 'blockSlice',
    initialState,
    reducers: {
        resetBlock: (state, action) => {
            return { ...initialState, block: action.payload }
        },
        saveBlock: (state, action) => ({ ...state, block: JSON.parse(JSON.stringify(action.payload)) }),
        setActiveParent: (state, action) => { return { ...state, activeParent: action.payload } },
        setActiveChild: (state, action) => { return { ...state, activeChild: action.payload } },
        setShop: (state, action) => { return { ...state, shop: action.payload } },
        setParentAttribute: (state, action) => {

            const params = action.payload;
            const tempBlock = JSON.parse(JSON.stringify(state.block));

            if (params.prop != null) {
                tempBlock[state.activeParent][params.attr][params.prop] = params.value;
            } else {
                tempBlock[state.activeParent][params.attr] = params.value;
            }

            return { ...state, block: tempBlock };
        },
        deleteRow: (state, action) => {
            const parentIndex = action.payload;
            const currentState = current(state);
            let tempBlock = JSON.parse(JSON.stringify(currentState.block));

            tempBlock = tempBlock.filter((item: any, index: number) => index != parentIndex);

            return { ...state, block: tempBlock, activeParent: null, activeChild: null }
        },
        deleteColumn: (state, action) => {

            const params = action.payload;
            const currentState = current(state);
            const tempBlock = JSON.parse(JSON.stringify(currentState.block));

            let temp = tempBlock[params.parentIndex].children.filter((item: any, index: number) => index !== params.childIndex);
            tempBlock[params.parentIndex].children = temp;

            return { ...state, block: tempBlock, activeParent: null, activeChild: null }
        },
        setPreviewSize: (state, action) => { return { ...state, previewSize: action.payload } },
        setChildBLock: (state, action) => {
            const params = action.payload;
            const currentState = current(state);
            const tempBlock = JSON.parse(JSON.stringify(currentState.block));
            tempBlock[currentState.activeParent].children[currentState.activeChild].block = params;

            return { ...state, block: tempBlock }
        },
        addResource: (state, action) => {

            const params = action.payload;
            const currentState = current(state);

            const tempBlock = JSON.parse(JSON.stringify(currentState.block));

            if (params.type == 'navigation_list') {
                tempBlock[currentState.activeParent].children[currentState.activeChild].block.resource.push({
                    myr: { ...defaultNavigationListResource },
                    sgd: { ...defaultNavigationListResource },
                    usd: { ...defaultNavigationListResource },
                });
            } else {
                tempBlock[currentState.activeParent].children[currentState.activeChild].block.resource.push({
                    myr: { ...defaultResource },
                    sgd: { ...defaultResource },
                    usd: { ...defaultResource },
                });
            }
            return { ...state, block: tempBlock };
        },
        setResource: (state, action) => {

            const params = action.payload;
            const resource_index = params.index;
            const resource = params.resource;
            const currentState = current(state);

            const tempBlock = JSON.parse(JSON.stringify(currentState.block));

            if (resource_index > -1) {
                tempBlock[currentState.activeParent].children[currentState.activeChild].block.resource[resource_index] = resource;
            } else {
                tempBlock[currentState.activeParent].children[currentState.activeChild].block.resource = resource;
            }

            return { ...state, block: tempBlock };
        },
        deleteResource: (state, action) => {

            const params = action.payload;
            const resource_index = params.index;
            const currentState = current(state);

            const tempBlock = JSON.parse(JSON.stringify(currentState.block));

            if (resource_index > -1) {
                tempBlock[currentState.activeParent].children[currentState.activeChild].block.resource.splice(resource_index, 1);
            } else {
                return { ...state };
            }

            return { ...state, block: tempBlock };
        },
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
        }
    }
})

export const { resetBlock, saveBlock, setActiveParent, setActiveChild, setShop, deleteRow, deleteColumn, setPreviewSize, setResource, deleteResource, addResource, setChildBLock } = blockSlice.actions

export default blockSlice.reducer;