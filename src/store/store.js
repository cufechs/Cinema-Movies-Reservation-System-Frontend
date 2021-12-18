import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movies";
import { userApi } from "../services/user";

export const store = configureStore({
    reducer: {
        [moviesApi.reducerPath]: moviesApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});