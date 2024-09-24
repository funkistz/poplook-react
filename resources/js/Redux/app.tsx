import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from './Slices/Sessions'
import { appStateSlice } from './Slices/AppState';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { dataDropdown } from '@/features/data_dropdown/redux/DataDropdown';
import { blockSlice } from '@/features/block_creator/redux/blockSlice';
import { logoSlice } from '@/Pages/Admin/Settings/Logo/Redux/logoSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['block']
}

// combine all reducers
const reducers = combineReducers({
    session: sessionSlice.reducer,
    appState: appStateSlice.reducer,
    dataDropdown: dataDropdown.reducer,
    block: blockSlice.reducer,
    logo: logoSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)