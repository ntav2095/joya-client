import { createSlice } from "@reduxjs/toolkit";

const VISA_COUNTRY_BANNER =
  "https://cdn.travelpulse.com/images/31aaedf4-a957-df11-b491-006073e71405/bb73aab8-f2bf-4278-88c3-33dd628df23f/630x355.jpg";

const VISA_BANNER = require("../assets/images/visa-banner.jpg");

const initialState = {
  status: "pending", //  pending | failed | succeed
  error: null,
  homeSliders: null,

  // tours
  vnTours: null,
  euTours: null,

  // guides
  guides: null,
  experience: null,
  destination: null,
  diary: null,
  handbook: null,

  // visa
  visa: {
    banner: VISA_BANNER,
  },

  // detail
  tourDetail: null,
  articleDetail: null,
  visaCountry: {
    banner: VISA_COUNTRY_BANNER,
  },
};

const banner = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBanners(state, action) {
      return { ...state, ...action.payload };
    },
    setBannerStatus(state, action) {
      state.status = action.payload;
    },
    setBannerError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setBannerStatus, setBanners, setBannerError } = banner.actions;
export default banner.reducer;
