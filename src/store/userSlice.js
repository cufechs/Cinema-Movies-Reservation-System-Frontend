import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: "",
    password: "", //TODO: remove it (to be replaced by token)
    token: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    isLoggedIn: ""
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

export default userSlice.reducer;