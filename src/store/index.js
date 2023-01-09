import { configureStore } from "@reduxjs/toolkit";

// reducers
import layoutReducer from "./layout.slice";
import bannerReducer from "./banner.slice";
import visaReducer from "./visa.slice";
import homeReducer from "./home.slice";
import lazy from "./lazyloading.slice";

const store = configureStore({
  reducer: {
    layout: layoutReducer,
    banner: bannerReducer,
    visa: visaReducer,
    home: homeReducer,
    lazy:lazy,
  },
});

export default store;
