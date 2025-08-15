import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Асинхронный thunk для регистрации
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error || "Ошибка регистрации");
      }
      return data.user; // ожидаем { id, login }
    } catch (error) {
      return rejectWithValue("Ошибка сети");
    }
  }
);

// Асинхронный thunk для логина
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data.error || "Ошибка входа");
      }
      return data.user; // ожидаем { id, login }
    } catch (error) {
      return rejectWithValue("Ошибка сети");
    }
  }
);

const initialState = {
  data: {
    login: null,
    password: null,
  },
  status: "idle",   // idle | submitting | success | failed
  error: null,
  userID: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fillForm(state, action) {
      const { login, password } = action.payload;
      state.data.login = login;
      state.data.password = password;
    },
    resetForm(state) {
      state.data.login = null;
      state.data.password = null;
      state.status = "idle";
      state.error = null;
      state.userID = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "submitting";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userID = action.payload.id;
        state.data.login = action.payload.login;
        state.data.password = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка регистрации";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "submitting";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userID = action.payload.id;
        state.data.login = action.payload.login;
        state.data.password = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Ошибка входа";
      });
  },
});

export const { fillForm, resetForm } = userSlice.actions;
export default userSlice.reducer;
