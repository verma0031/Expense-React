import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity} from "../redux/cart/cartSlice";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const dispatch = useDispatch();

	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart({ id }));
	};

	const handleQuantityChange = (id, newQuantity) => {
		dispatch(updateQuantity({ id, quantity: newQuantity }));
	};

	return (
		<div className="cart">
			<h2>Shopping Cart</h2>
			<ul>
				{cartItems.map((item) => (
					<li key={item.id}>
						<span>
							{item.name} - ${item.price}
						</span>
						<div>
							<button
								onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
							>
								-
							</button>
							<span>{item.quantity}</span>
							<button
								onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
							>
								+
							</button>
						</div>
						<button onClick={() => handleRemoveFromCart(item.id)}>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Cart;
