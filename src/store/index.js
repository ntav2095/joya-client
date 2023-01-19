import { configureStore } from "@reduxjs/toolkit";

// reducers
import bannerReducer from "./banner.slice";
import visaReducer from "./visa.slice";
import toursReducer from "./tours.slice";
import guidesReducer from "./guides.slice";
import lazy from "./lazyloading.slice";

const store = configureStore({
  reducer: {
    banner: bannerReducer,
    visa: visaReducer,
    tours: toursReducer,
    guides: guidesReducer,
    lazy: lazy,
  },
});

export default store;
