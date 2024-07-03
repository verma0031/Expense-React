// src/redux/reducers/authReducer.js

const initialState = {
	isAuthenticated: false,
	token: null,
	userId: null,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_SUCCESS":
			return {
				...state,
				isAuthenticated: true,
				token: action.payload.token,
				userId: action.payload.userId,
				error: null,
			};
		case "LOGIN_FAILURE":
			return {
				...state,
				isAuthenticated: false,
				token: null,
				userId: null,
				error: action.payload,
			};
		case "LOGOUT_SUCCESS":
			return {
				...state,
				isAuthenticated: false,
				token: null,
				userId: null,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
