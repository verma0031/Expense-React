// src/redux/actions.js
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const INCREMENTBY2 = "INCREMENTBY2";
export const DECREMENTBY2 = "DECREMENTBY2";

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementBy2 = () => ({ type: INCREMENTBY2 });
export const decrementBy2 = () => ({ type: DECREMENTBY2 });
