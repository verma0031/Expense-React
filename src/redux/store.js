// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./features/expensesSlice";
import themeReducer from "./features/themeSlice"

const store = configureStore({
	reducer: {
		auth: authReducer,
		expenses: expensesReducer,
		theme: themeReducer,
		// Add other reducers here if needed
	},
});

export default store;
