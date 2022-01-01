import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    username: "",
    password: "", //TODO: remove it (to be replaced by token)
    token: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    isLoggedIn: false,
    type: "guest",
    id: null,
    phone: null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            let {
                first_name,
                last_name,
                username,
                email,
                mobile_number,
                role
            } = action.payload;
            state.type = role;
            state.firstName = first_name;
            state.lastName = last_name;
            state.username = username;
            state.email = email;
            state.phone = mobile_number;
            state.role = role;
            state.isLoggedIn = true
            let user = { ...action.payload, isLoggedIn: true, type: role }
            //localStorage.setItem('user', JSON.stringify());
        },
        logout: (state, action) => {
            //state = initialState;
            // localStorage.removeItem('state');
            // localStorage.removeItem('user');
            // localStorage.removeItem('state.user');
            localStorage.removeItem('persistantState');
            state.email = "";
            state.role = "guest";
            state.type = "guest";
            state.isLoggedIn = false;
            state.token = "";
            console.log("logging out");
        },
        // signup: (state, action) => {
        //     let {
        //         first_name,
        //         last_name,
        //         username,
        //         email,
        //         mobile_number,
        //         role
        //     } = action.payload;
        //     state.
        // }
    }
});

export const userActions = userSlice.actions;
export default userSlice;