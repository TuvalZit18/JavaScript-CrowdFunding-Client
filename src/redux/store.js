import { configureStore } from "@reduxjs/toolkit";
import campaignSlice from "./slices/campaignSlice";
const store = configureStore({
  reducer: {
    campaign: campaignSlice,
  },
});
export default store;
