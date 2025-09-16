import { api } from "/";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
  middleware: (getDeafaultMiddleware) =>
    getDeafaultMiddleware().concat(api.middleware),
});
