import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import charFormSlice from './charFormSlice.js';
import userSlice from './userSlice.js';
import ruleSlice from './ruleSlice.js'

const persistConfig = {
  key: "root",
  storage,
  whitelist: [ "user", ],
};

const rootStore = combineReducers({
    user: userSlice,
    characterForm: charFormSlice,
    rules: ruleSlice,
});

const persistedReducer = persistReducer(persistConfig, rootStore);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);