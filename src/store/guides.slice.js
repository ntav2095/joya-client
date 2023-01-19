import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuides as fetchGuidesApi } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  articles: [],
  status: "idle", // idle | pending | succeed | failed
  error: null,
};

export const fetchGuides = createAsyncThunk("guides/fetchGuides", async () => {
  const response = await axios(fetchGuidesApi());
  return response.data.data;
});

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.status = "succeed";
        state.articles = action.payload;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default guidesSlice.reducer;

// selectors
export const selectGuides = (state) => state.guides.articles;
export const selectGuidesExperiences = (state) =>
  state.guides.articles.filter((article) =>
    article.category.includes("trai-nghiem")
  );
export const selectGuidesHandbooks = (state) =>
  state.guides.articles.filter((article) =>
    article.category.includes("cam-nang")
  );
export const selectGuidesNicePlaces = (state) =>
  state.guides.articles.filter((article) =>
    article.category.includes("diem-den")
  );
export const selectGuidesDiaries = (state) =>
  state.guides.articles.filter((article) =>
    article.category.includes("nhat-ky")
  );
export const selectHotGuides = (state) =>
  state.guides.articles.filter((article) => article.hot);
export const selectGuidesStatus = (state) => state.guides.status;
export const selectGuidesError = (state) => state.guides.error;

// sliders
export const selectGuidesSliders = (state) =>
  state.guides.articles.filter((article) => article.layout.includes("guides"));
export const selectHandbookSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("cam-nang")
  );
export const selectDiarySliders = (state) =>
  state.guides.articles.filter((article) => article.layout.includes("nhat-ky"));
export const selectExperienceSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("trai-nghiem")
  );
export const selectNicePlaceSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("diem-den")
  );
