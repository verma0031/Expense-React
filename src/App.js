import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"; // Import Provider
import store from "../src/redux/store"; // Import Redux store
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import DailyExpenses from "./components/DailyExpenses";
import Cart from "./components/Cart"; 

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/welcome" element={<Header />} />
					<Route path="/daily-expenses" element={<DailyExpenses />} />
					<Route path="/" element={<Navigate to="/login" />} />
					<Route path="/mycart" element={<Cart />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
