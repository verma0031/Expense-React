// src/redux/actions/authActions.js

export const loginSuccess = (token, userId) => ({
	type: "LOGIN_SUCCESS",
	payload: { token, userId },
});

export const loginFailure = (error) => ({
	type: "LOGIN_FAILURE",
	payload: error,
});

export const logoutSuccess = () => ({
	type: "LOGOUT_SUCCESS",
});
