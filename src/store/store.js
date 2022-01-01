import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { moviesApi } from "../services/movies";
import { userApi } from "../services/user";
import { managerApi } from "../services/manager";
import userSlice from "./userSlice";
import { loadState, saveState } from './localStorage';
import { throttle } from 'lodash';


// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  // load string from localStarage and convert into an Object
  // invalid output must be undefined
  function loadFromLocalStorage() {
    try {
      const serialisedState = localStorage.getItem("persistantState");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }


const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        [moviesApi.reducerPath]: moviesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [managerApi.reducerPath]: managerApi.reducer,
    },
    //preloadedState: loadFromLocalStorage(),
    preloadedState: {
      user: loadFromLocalStorage(),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesApi.middleware)
});

// store.subscribe(
//     throttle(() => saveState(store.getState()), 1000)
// );

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
store.subscribe(() => saveToLocalStorage(store.getState().user));
export default store;