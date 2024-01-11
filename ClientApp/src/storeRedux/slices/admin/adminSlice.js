import { createSlice } from "@reduxjs/toolkit";


export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminStateRedux: false,
  },
  reducers: {
    changeAdmin: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.adminStateRedux = !state.adminStateRedux;
      // state.adminStateRedux = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeAdmin } = adminSlice.actions;