import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  info: {
    name: "",
    inCharge: "",
    phone: "",
    address: {
      city: null,
      region: null,
      full: "",
    },
  },
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateMarketInfo(state, { payload: { name, inCharge, phone, address } }) {
      state.info = { name, inCharge, phone, address };
    },
  },
});

export const { updateMarketInfo } = marketSlice.actions

export default marketSlice.reducer;
