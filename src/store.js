import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import parcelReducer from "./features/parcel/parcelSlice";

export const store = configureStore({
  reducer: {
    users: authReducer,
    parcels: parcelReducer,
  },
});
