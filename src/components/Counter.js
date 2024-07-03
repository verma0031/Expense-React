// src/components/Counter.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	INCREMENT,
	DECREMENT,
	INCREMENTBY2,
	DECREMENTBY2,
	INCREMENTBY5,
	DECREMENTBY5,
} from "../redux/actions";

const Counter = () => {
	const count = useSelector((state) => state.count);
	const dispatch = useDispatch();

	return (
		<div>
			<h1>Count: {count}</h1>
			<button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
			<button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
			<button onClick={() => dispatch({ type: INCREMENTBY2 })}>
				IncrementBy2
			</button>
			<button onClick={() => dispatch({ type: DECREMENTBY2 })}>
				DecrementBy2
			</button>
			<button onClick={() => dispatch({ type: INCREMENTBY5 })}>
				IncrementBy5
			</button>{" "}
			{/* New button */}
			<button onClick={() => dispatch({ type: DECREMENTBY5 })}>
				DecrementBy5
			</button>{" "}
			{/* New button */}
		</div>
	);
};

export default Counter;
