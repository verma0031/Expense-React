// src/components/Login2.js
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login2 = () => {
	const dispatch = useDispatch();

	const handleLogin = () => {
		dispatch(login());
	};

	return (
		<div className="login-screen">
			<h1>Login Screen</h1>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login2;
