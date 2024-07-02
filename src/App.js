import React, { useState } from "react";
import  ReactDOM  from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login onLogin={handleLogin} />} />
				<Route path="/signup" element={<Signup />} />
				<Route
					path="/welcome"
					element={isLoggedIn ? <Welcome /> : <Login onLogin={handleLogin} />}
				/>
				<Route path="/" element={<Login onLogin={handleLogin} />} />
			</Routes>
		</BrowserRouter>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
