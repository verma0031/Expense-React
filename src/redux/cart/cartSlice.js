// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCartVisible: false,
	cartItems: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCartVisibility(state) {
			state.isCartVisible = !state.isCartVisible;
		},
		addToCart(state, action) {
			const { id, name, price } = action.payload;
			const existingItem = state.cartItems.find((item) => item.id === id);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.cartItems.push({ id, name, price, quantity: 1 });
			}
		},
		removeFromCart(state, action) {
			const { id } = action.payload;
			const index = state.cartItems.findIndex((item) => item.id === id);
			if (index !== -1) {
				if (state.cartItems[index].quantity > 1) {
					state.cartItems[index].quantity--;
				} else {
					state.cartItems = state.cartItems.filter((item) => item.id !== id);
				}
			}
		},
		updateQuantity(state, action) {
			const { id, quantity } = action.payload;
			const index = state.cartItems.findIndex((item) => item.id === id);
			if (index !== -1) {
				state.cartItems[index].quantity = quantity;
			}
		},
		// Other cart-related actions as needed
	},
});

export const {
	toggleCartVisibility,
	addToCart,
	removeFromCart,
	updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
