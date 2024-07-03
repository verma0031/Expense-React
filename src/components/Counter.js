// src/components/Counter.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	increment,
	decrement,
	incrementBy2,
	decrementBy2,
} from "../redux/actions";

const Counter = () => {
	const count = useSelector((state) => state);
	const dispatch = useDispatch();

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(incrementBy2())}>Increment by 2</button>
			<button onClick={() => dispatch(decrementBy2())}>Decrement by 2</button>
		</div>
	);
};

export default Counter;
