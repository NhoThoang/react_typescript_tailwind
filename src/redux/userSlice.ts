import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  isAuthenticated: boolean;
  token: string;
}

const initialState: User = {
  username: "",
  isAuthenticated: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    logout: (_state) => {
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
