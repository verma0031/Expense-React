import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: false,
	token: null,
	userId: null,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess(state, action) {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.userId = action.payload.userId;
			state.error = null;
		},
		loginFailure(state, action) {
			state.isAuthenticated = false;
			state.token = null;
			state.userId = null;
			state.error = action.payload;
		},
		logoutSuccess(state) {
			state.isAuthenticated = false;
			state.token = null;
			state.userId = null;
			state.error = null;
		},
		logout(state) {
			state.isLoggedIn = false;
			state.token = null;
			state.userId = null;
		},
	},
});

export const { loginSuccess, loginFailure, logoutSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
