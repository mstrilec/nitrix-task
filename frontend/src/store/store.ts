import { configureStore } from "@reduxjs/toolkit";
import apartmentReducer from "../redux/apartmentSlice";

const store = configureStore({
  reducer: {
    apartments: apartmentReducer,
  },
});

export default store;
