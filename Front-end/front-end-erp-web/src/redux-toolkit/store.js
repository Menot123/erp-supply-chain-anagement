import { configureStore } from '@reduxjs/toolkit'
import langReducer from '../redux-toolkit/slices/langSlice'
// // import userReducer from './slices/userSlice'
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit'

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['userRedux']

// }

const reducer = combineReducers({
    language: langReducer,
    // userRedux: userReducer,
})

// const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})