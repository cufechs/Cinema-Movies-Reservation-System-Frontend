import { createSlice } from '@reduxjs/toolkit';

function saveToLocalStorage(state) {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("persistantState2", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }

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
                role,
                id,
                token
            } = action.payload;
            state.type = role;
            state.firstName = first_name;
            state.lastName = last_name;
            state.username = username;
            state.email = email;
            state.phone = mobile_number;
            state.role = role;
            state.isLoggedIn = true;
            state.id = id;
            state.token = token;
            let user = { ...action.payload, isLoggedIn: true, type: role, id: id, role: role }
            localStorage.setItem('user', JSON.stringify(action.payload));
            //saveToLocalStorage(state.user)
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