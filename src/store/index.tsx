import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./slices/AuthSlice";

const store = configureStore({
  reducer: {
   
    userAuth: AuthSlice
  },
});

export default store;
