import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  userID: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateField(state, action) {
      state.status = action.payload.status;
      state.userID = action.payload.id;
    },
    resetForm(state) {
      state.status = "unauth";
      state.userID = null;
    },
  }
});

export const { updateField, resetForm } = userSlice.actions;
export default userSlice.reducer;
