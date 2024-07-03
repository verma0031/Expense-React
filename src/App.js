import React, { useState } from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Header from "./components/Header";
import ForgotPassword from "./components/ForgotPassword";
import DailyExpenses from "./components/DailyExpenses";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login onLogin={handleLogin} />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route
					path="/welcome"
					element={
						isLoggedIn ? (
							<Header onLogout={handleLogout} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/daily-expenses"
					element={isLoggedIn ? <DailyExpenses /> : <Navigate to="/login" />}
				/>
				<Route path="/" element={<Navigate to="/login" />} />
			</Routes>
		</BrowserRouter>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
