import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movies";
import { userApi } from "../services/user";
import { managerApi } from "../services/manager";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [managerApi.reducerPath]: managerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});