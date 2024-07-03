// src/redux/reducer.js
import {
	INCREMENT,
	DECREMENT,
	INCREMENTBY2,
	DECREMENTBY2,
	INCREMENTBY5,
	DECREMENTBY5,
} from "./actions";

const initialState = {
	count: 0,
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case INCREMENT:
			return { ...state, count: state.count + 1 };
		case DECREMENT:
			return { ...state, count: state.count - 1 };
		case INCREMENTBY2:
			return { ...state, count: state.count + 2 };
		case DECREMENTBY2:
			return { ...state, count: state.count - 2 };
		case INCREMENTBY5:
			return { ...state, count: state.count + 5 };
		case DECREMENTBY5:
			return { ...state, count: state.count - 5 };
		default:
			return state;
	}
}

export default rootReducer;
