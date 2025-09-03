import { createSlice } from '@reduxjs/toolkit';
import { settings } from './settings.js';

const initialState = {
  form: structuredClone(settings),
  curCharId: null,
  savedChars: {}, // ключ - id, значение - объект персонажа
  status: 'idle',
  error: null,
  result: null,
};

const characterFormSlice = createSlice({
  name: 'characterForm',
  initialState,
  reducers: {
    updateField(state, action) {
      const { path, value } = action.payload;
      const keys = path.split('.');
      const lastKey = keys.pop();

      // Если есть curCharId, редактируем конкретного персонажа, иначе form
      const target = state.curCharId ? state.savedChars[state.curCharId] : state.form;

      let temp = target;
      for (const key of keys) {
        temp = temp[key];
      }
      temp[lastKey] = value;
    },

    addSavedChar(state, action) {
      const { id, data } = action.payload;
      if (state.savedChars[id]) {
        Object.assign(state.savedChars[id], data); // обновляем поля
      } else {
        state.savedChars[id] = structuredClone(data); // если новый — добавляем
      }
    },

    getSavedChars(state, action) {
      const data = action.payload;
      data.forEach(({ id, data }) => {
        state.savedChars[id] = structuredClone(data);
      });
    },

    resetForm(state) {
      state.form = structuredClone(settings);
      state.curCharId = null;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },

    setId(state, action) {
      const id = action.payload;
      state.curCharId = id;
    },
  },
});

export const { updateField, resetForm, setStatus, addSavedChar, getSavedChars, setId } =
  characterFormSlice.actions;
export default characterFormSlice.reducer;
