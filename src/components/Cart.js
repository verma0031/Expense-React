import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
	const isCartVisible = useSelector((state) => state.cart.isCartVisible);
	const cartItems = useSelector((state) => state.cart.cartItems);

	if (!isCartVisible) {
		return null; // Hide the cart component if it's not visible
	}

	return (
		<div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4">
			<h2 className="text-xl font-bold mb-4">Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<ul>
					{cartItems.map((item) => (
						<li key={item.id} className="mb-2">
							<span>{item.name}</span>
							<button
								className="ml-2 text-red-500" /* Add onClick handler to remove item from cart */
							>
								Remove
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Cart;
