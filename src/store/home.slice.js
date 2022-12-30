import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  euTours: {
    status: "idle", // idle | pending | succeed | failed
    data: null,
    error: null,
  },
  vnTours: {
    status: "idle", // idle | pending | succeed | failed
    data: null,
    error: null,
  },
  guides: {
    status: "idle", // idle | pending | succeed | failed
    data: null,
    error: null,
  },
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setProducts(state, action) {
      const { type, data } = action.payload;
      state[type].data = data;
    },
    setProductsStatus(state, action) {
      const { type, status } = action.payload;
      state[type].status = status;
    },
    setProductsError(state, action) {
      const { type, error } = action.payload;
      state[type].error = error;
    },
    resetHomeData() {
      return initialState;
    },
  },
});

export const {
  setProducts,
  setProductsStatus,
  setProductsError,
  resetHomeData,
} = homeSlice.actions;
export default homeSlice.reducer;
