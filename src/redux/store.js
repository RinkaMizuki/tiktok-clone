import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authSlice from '~/redux/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import followSlice from '~/redux/followSlice';
import videoSlice from './videoSlice';
import profileSlice from './profileSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  follow: followSlice,
  video: videoSlice,
  profile: profileSlice,
});
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);
