import React, { useState } from "react";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleForgotPassword = async (e) => {
		e.preventDefault();
		setLoading(true);

		const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE`;

		const payload = {
			requestType: "PASSWORD_RESET",
			email,
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

			setMessage("Password reset email sent! Check your inbox.");
			setLoading(false);
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="w-full max-w-xs">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Forgot Password
					</h2>
					{message && <div className="text-green-500 mb-4">{message}</div>}
					{error && <div className="text-red-500 mb-4">{error}</div>}
					<form onSubmit={handleForgotPassword}>
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
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
							disabled={loading}
						>
							{loading ? "Sending..." : "Send Password Reset Email"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
