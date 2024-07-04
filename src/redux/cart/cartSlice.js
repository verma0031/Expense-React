// cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCartVisible: false,
	cartItems: [],
	notification: null,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCartVisibility(state) {
			state.isCartVisible = !state.isCartVisible;
		},
		addToCartStart(state) {
			state.notification = {
				status: "pending",
				title: "Sending...",
				message: "Sending cart data!",
			};
		},
		addToCartSuccess(state) {
			state.notification = {
				status: "success",
				title: "Success!",
				message: "Sent cart data successfully!",
			};
		},
		addToCartError(state, action) {
			state.notification = {
				status: "error",
				title: "Error!",
				message: action.payload,
			};
		},
		clearNotification(state) {
			state.notification = null;
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
	addToCartStart,
	addToCartSuccess,
	addToCartError,
	clearNotification,
	addToCart,
	removeFromCart,
	updateQuantity,
} = cartSlice.actions;

export const sendCartData = (item) => async (dispatch) => {
	dispatch(addToCartStart());
	try {
		const response = await fetch(
			"https://expense-tracker-adfab-default-rtdb.firebaseio.com/cart.json",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(item),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to send cart data");
		}

		dispatch(addToCart(item));
		dispatch(addToCartSuccess());
	} catch (error) {
		dispatch(addToCartError(error.message));
	}
};
export default cartSlice.reducer;
