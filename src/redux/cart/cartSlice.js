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
		setCartItems(state, action) {
			state.cartItems = action.payload;
		},
		fetchCartStart(state) {
			state.notification = {
				status: "pending",
				title: "Fetching...",
				message: "Fetching cart data!",
			};
		},
		fetchCartSuccess(state) {
			state.notification = {
				status: "success",
				title: "Success!",
				message: "Fetched cart data successfully!",
			};
		},
		fetchCartError(state, action) {
			state.notification = {
				status: "error",
				title: "Error!",
				message: action.payload,
			};
		},
		updateCartStart(state) {
			state.notification = {
				status: "pending",
				title: "Updating...",
				message: "Updating cart data!",
			};
		},
		updateCartSuccess(state) {
			state.notification = {
				status: "success",
				title: "Success!",
				message: "Updated cart data successfully!",
			};
		},
		updateCartError(state, action) {
			state.notification = {
				status: "error",
				title: "Error!",
				message: action.payload,
			};
		},
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
	setCartItems,
	fetchCartStart,
	fetchCartSuccess,
	fetchCartError,
	updateCartStart,
	updateCartSuccess,
	updateCartError,
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

export const fetchCartData = () => async (dispatch) => {
	dispatch(fetchCartStart());
	try {
		const response = await fetch(
			"https://expense-tracker-adfab-default-rtdb.firebaseio.com/cart.json"
		);

		if (!response.ok) {
			throw new Error("Failed to fetch cart data");
		}

		const data = await response.json();
		const loadedCartItems = Object.keys(data).map((key) => ({
			id: key,
			...data[key],
		}));

		dispatch(setCartItems(loadedCartItems));
		dispatch(fetchCartSuccess());
	} catch (error) {
		dispatch(fetchCartError(error.message));
	}
};

export const updateCartData = (id, quantity) => async (dispatch, getState) => {
	const cartItems = getState().cart.cartItems;
	const item = cartItems.find((item) => item.id === id);

	dispatch(updateCartStart());
	try {
		const response = await fetch(
			`https://expense-tracker-adfab-default-rtdb.firebaseio.com/cart/${id}.json`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ quantity }),
			}
		);

		if (!response.ok) {
			throw new Error("Failed to update cart data");
		}

		dispatch(updateQuantity({ id, quantity }));
		dispatch(updateCartSuccess());
	} catch (error) {
		dispatch(updateCartError(error.message));
	}
};

export default cartSlice.reducer;
