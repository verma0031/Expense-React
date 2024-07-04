// App.js

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "./redux/store"; // Import Redux store
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import DailyExpenses from "./components/DailyExpenses";
import Cart from "./components/Cart";
import Product from "./components/Product";
import Notification from "./components/Notification";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "./redux/cart/cartSlice";

const AppContent = () => {
	const notification = useSelector((state) => state.cart.notification);
	const dispatch = useDispatch();

	const closeNotification = () => {
		dispatch(clearNotification());
	};

	return (
		<>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
					onClose={closeNotification}
				/>
			)}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/welcome" element={<Header />} />
				<Route path="/daily-expenses" element={<DailyExpenses />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/mycart" element={<Cart />} />
				<Route path="/products/:id" element={<Product />} />
			</Routes>
		</>
	);
};

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppContent />
			</BrowserRouter>
		</Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
