import { configureStore } from '@reduxjs/toolkit';
import charFormSlice from './charFormSlice.js';
import userSlice from './userSlice.js';
import ruleSlice from './ruleSlice.js'

export const store = configureStore({
  reducer: {
    user: userSlice,
    characterForm: charFormSlice,
    rules: ruleSlice,
  }
})