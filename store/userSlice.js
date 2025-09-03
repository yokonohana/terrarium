import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "unauth",
  userID: null,
  login: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },
    resetForm(state) {
      state.status = "unauth";
      state.userID = null;
    },
  }
});

export const { updateField, resetForm } = userSlice.actions;
export default userSlice.reducer;
