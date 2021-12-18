import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    password: "", //TODO: remove it (to be replaced by token)
    token: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    isLoggedIn: false,
    type: "Guest"
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state = action.payload;
        },
        logout: (state, action) => {
            state = initialState;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice;