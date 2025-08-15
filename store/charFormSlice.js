import { createSlice } from '@reduxjs/toolkit';
import { settings } from './settings.js';

const initialState = {
  form: structuredClone(settings),
  status: 'idle', // idle(начальное состояние) || submitting(форма в процессе отправки) || success(успешный результат) || error(неуспешный результат + ошибка)
  error: null,
  result: null
};

const characterFormSlice = createSlice({
  name: 'characterForm',
  initialState,
  reducers: {
    updateField(state, action) {
      const { path, value } = action.payload;
      const keys = path.split('.');
      const lastKey = keys.pop();
      let temp = state.form;

      for (const key of keys) {
        temp = temp[key];
      }

      temp[lastKey] = value;
    },
    resetForm(state) {
      state.form = structuredClone(settings);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  }
});

export const { updateField, updateFields, resetForm, setStatus } = characterFormSlice.actions;
export default characterFormSlice.reducer;