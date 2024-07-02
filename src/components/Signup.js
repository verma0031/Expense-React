import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		const API_KEY = "AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE";
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

		const payload = {
			email,
			password,
			returnSecureToken: true,
		};

		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error.message);
			}

			const data = await response.json();
			console.log("User has successfully signed up.", data);
			navigate("/login"); // Navigate to login page after successful signup
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="w-full max-w-xs">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
					{error && <div className="text-red-500 mb-4">{error}</div>}
					<form onSubmit={handleSignup}>
						<div className="mb-4">
							<label className="block text-gray-700">Email</label>
							<input
								type="email"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Password</label>
							<input
								type="password"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Confirm Password</label>
							<input
								type="password"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							Sign Up
						</button>
					</form>
					<div className="mt-4 text-center">
						<Link to="/login" className="text-green-500">
							Have an account? Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
