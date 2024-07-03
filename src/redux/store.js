// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./features/expensesSlice";
import themeReducer from "./features/themeSlice";
import cartReducer from "./cart/cartSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		expenses: expensesReducer,
		theme: themeReducer,
        cart: cartReducer,
		// Add other reducers here if needed
	},
});

export default store;
