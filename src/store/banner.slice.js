import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    banner: "http://www.maashaktivisaservices.com/img/TOurist1.jpg",
  },

  // detail
  tourDetail: null,
  articleDetail: null,
  visaCountry: {
    banner:
      "https://cdn.travelpulse.com/images/31aaedf4-a957-df11-b491-006073e71405/bb73aab8-f2bf-4278-88c3-33dd628df23f/630x355.jpg",
  },
};

const banner = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateBanner(state, action) {
      const { type, bannerItem } = action.payload; // bannerItem: { _id, banner: url }
      state[type] = bannerItem;
    },
    setBanners(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateBanner, setBanners } = banner.actions;
export default banner.reducer;
