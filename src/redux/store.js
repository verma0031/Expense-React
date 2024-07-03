// src/redux/store.js
import { legacy_createStore as createStore }  from "redux";
import rootReducer from "./reducer"; // Ensure this is correctly pointing to your root reducer

const store = createStore(rootReducer);

export default store;
