import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cart/cartSlice";

const CartItem = ({ id, name, price, quantity }) => {
	const [newQuantity, setNewQuantity] = useState(quantity);
	const dispatch = useDispatch();

	const handleQuantityChange = () => {
		if (newQuantity > 0) {
			dispatch(updateQuantity({ id, quantity: newQuantity }));
		} else {
			dispatch(removeFromCart({ id }));
		}
	};

	return (
		<div className="cart-item">
			<p>{name}</p>
			<p>Price: ${price}</p>
			<input
				type="number"
				value={newQuantity}
				onChange={(e) => setNewQuantity(parseInt(e.target.value))}
			/>
			<button onClick={handleQuantityChange}>Update Quantity</button>
		</div>
	);
};

export default CartItem;
