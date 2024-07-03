// src/App.js
import React from "react";
import { useSelector } from "react-redux";
import Login2 from "./components/Login2";
import MainScreen from "./components/MainScreen";

const App2 = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	return (
		<div className="App">{isAuthenticated ? <MainScreen /> : <Login2 />}</div>
	);
};

export default App2;
