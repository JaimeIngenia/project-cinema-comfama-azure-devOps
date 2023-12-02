import { createSlice } from "@reduxjs/toolkit";


export const authotizedSlice = createSlice({
  name: "authorized",
  initialState: {
    authorizedStateRedux: false,
  },
  reducers: {
    changeAuthorized: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.authorizedStateRedux = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAuthorized } = authotizedSlice.actions;