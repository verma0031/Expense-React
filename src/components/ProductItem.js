// components/ProductItem.js

import React from "react";
import { useDispatch } from "react-redux";
import { sendCartData, removeFromCart } from "../redux/cart/cartSlice";

const ProductItem = ({ id, name, price, quantity }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(sendCartData({ id, name, price }));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart({ id }));
	};

	return (
		<div className="border p-4">
			<h3>{name}</h3>
			<p>Price: ${price}</p>
			<p>Quantity: {quantity}</p>
			<button onClick={handleAddToCart}>Add to Cart</button>
			<button onClick={handleRemoveFromCart}>Remove from Cart</button>
		</div>
	);
};

export default ProductItem;
