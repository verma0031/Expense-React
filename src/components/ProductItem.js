// ProductItem.js

import React from "react";
import { useDispatch } from "react-redux";
import {
	sendCartData,
	removeFromCart,
	updateCartData,
} from "../redux/cart/cartSlice";

const ProductItem = ({ id, name, price, quantity }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(sendCartData({ id, name, price, quantity: quantity + 1 }));
	};

	const handleRemoveFromCart = () => {
		dispatch(removeFromCart({ id }));
	};

	const handleQuantityChange = (event) => {
		const newQuantity = event.target.value;
		dispatch(updateCartData(id, newQuantity));
	};

	return (
		<div className="border p-4">
			<h3>{name}</h3>
			<p>Price: ${price}</p>
			<p>
				Quantity:
				<input
					type="number"
					value={quantity}
					onChange={handleQuantityChange}
					min="1"
				/>
			</p>
			<button onClick={handleAddToCart}>Add to Cart</button>
			<button onClick={handleRemoveFromCart}>Remove from Cart</button>
		</div>
	);
};

export default ProductItem;
