import { createSlice } from "@reduxjs/toolkit";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: null,
    filteredCampaigns: null,
    isFiltering: false,
    loading: false,
    error: null,
  },
  reducers: {
    setCampaigns: (state, action) => {
      state.campaigns = action.payload;
    },
    setFilteredCampaigns: (state, action) => {
      state.filteredCampaigns = action.payload;
    },
    setFiltering: (state, action) => {
      state.isFiltering = action.payload;
    },
  },
  extraReducers: {},
});
export const { setCampaigns, setFilteredCampaigns, setFiltering } =
  campaignSlice.actions;
export default campaignSlice.reducer;
