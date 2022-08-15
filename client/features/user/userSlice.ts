import { createSlice } from "@reduxjs/toolkit";
import { UserSliceType } from "../../types/reduxTypes";

const initialState: UserSliceType = {
  name: "Guest",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, { payload }) => {
      state.email = payload.email;
      state.name = payload.name;
      state.token = payload.token;
    },
    logoutUser: (state) => {
      return {
        name: "Guest",
      };
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
