// src/components/MainScreen.js
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const MainScreen = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<div className="main-screen">
			<h1>Main Screen</h1>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default MainScreen;
