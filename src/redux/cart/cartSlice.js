import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCartVisible: false,
	cartItems: [], // You can modify this to suit your cart item structure
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCartVisibility(state) {
			state.isCartVisible = !state.isCartVisible;
		},
		addToCart(state, action) {
			state.cartItems.push(action.payload);
		},
		removeFromCart(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload.id
			);
		},
		// Other cart-related actions as needed
	},
});

export const { toggleCartVisibility, addToCart, removeFromCart } =
	cartSlice.actions;

export default cartSlice.reducer;
