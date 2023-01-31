import axios from "../services/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTours as fetchToursApi } from "../services/apis";

const initialState = {
  tours: [],
  status: "idle", // idle | pending | succeed | fail
  error: null,
};

export const fetchTours = createAsyncThunk("tours/fetchTours", async () => {
  const response = await axios(fetchToursApi());
  return response.data.data;
});

const toursSlice = createSlice({
  name: "tours",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = "succeed";
        state.tours = action.payload.map((tour) => {
          if (tour.destinations.every((dest) => dest.country === "vietnam")) {
            return { ...tour, is_vn_tour: true };
          }

          if (tour.destinations.some((dest) => dest.continent === "europe")) {
            return { ...tour, is_eu_tour: true };
          }

          return tour;
        });
      })
      .addCase(fetchTours.rejected, (state, action) => {});
  },
});

// selectors
const isEuTour = (destinations) =>
  destinations.some((item) => item.continent === "europe");
const isVnTour = (destinations) =>
  destinations.every((item) => item.country === "vietnam");

export const selectTours = (state) => state.tours.tours;

// hot tours
export const selectHotEuTours = (state) =>
  state.tours.tours.filter((tour) => tour.hot && tour.is_eu_tour).slice(0, 6);
export const selectHotVnTours = (state) =>
  state.tours.tours.filter((tour) => tour.hot && tour.is_vn_tour).slice(0, 6);

// tour châu âu
export const selectEuTours = (state) =>
  state.tours.tours.filter((tour) => isEuTour(tour.destinations));

// tour việt nam
export const selectVnTours = (state) =>
  state.tours.tours.filter((tour) => isVnTour(tour.destinations));

export const selectToursStatus = (state) => state.tours.status;
export const selectToursError = (state) => state.tours.error;
export const selectHomeSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.layout.includes("home"));

// tour banner
export const selectEuSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.layout.includes("eu-tours"));
export const selectVnSliderTours = (state) =>
  state.tours.tours.filter((tour) => tour.layout.includes("vn-tours"));

export default toursSlice.reducer;
