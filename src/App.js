import React, { useState } from "react";
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ForgotPassword from "./components/ForgotPassword";

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
							<Welcome onLogout={handleLogout} />
						) : (
							<Login onLogin={handleLogin} />
						)
					}
				/>
				<Route path="/" element={<Login onLogin={handleLogin} />} />
			</Routes>
		</BrowserRouter>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
