import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  statusModal: null
};

const ruleSlice = createSlice({
  name: "rules",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = state.status === action.payload ? null : action.payload;
    },
    setModalStatus(state, action) {
      state.statusModal = state.statusModal === action.payload ? null : action.payload;
    }
  }
});

export const { setStatus, setModalStatus } = ruleSlice.actions;
export default ruleSlice.reducer;
