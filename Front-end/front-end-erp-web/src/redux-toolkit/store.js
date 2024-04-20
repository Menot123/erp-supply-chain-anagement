import { configureStore } from '@reduxjs/toolkit'
import langReducer from '../redux-toolkit/slices/langSlice'
import userReducer from '../redux-toolkit/slices/userSlice'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const reducer = combineReducers({
    language: langReducer,
    user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})