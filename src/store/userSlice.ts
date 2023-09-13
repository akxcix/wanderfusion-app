import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import { RootState } from "./store";

export interface User {
  id: string;
  email: string;
  username?: string;
  profilePicture?: string;
}

export interface CurrentUser {
  user?: User;
}

const initialState: CurrentUser = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserFromJwt: (state, action: PayloadAction<string>) => {
      const user: User = jwtDecode(action.payload);
      state.user = user;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

export const { setUserFromJwt, removeUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
