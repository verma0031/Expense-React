// src/components/Welcome.js
import React, { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";

const Welcome = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const checkEmailVerification = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {

				const response = await fetch(
					`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ idToken: token }),
					}
				);

				const data = await response.json();
				if (data.users[0].emailVerified) {
					setEmailVerified(true);
				}
			} catch (err) {
				setError(err.message);
			}
		};

		checkEmailVerification();
	}, []);

	const sendVerificationEmail = async () => {
		const token = localStorage.getItem("token");

		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: token }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error.message);
			}

			alert("Verification email sent. Please check your inbox.");
		} catch (err) {
			setError(err.message);
		}
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
				<div>
					<h1 className="text-4xl font-bold mb-4">
						Welcome to Expense Tracker
					</h1>
					{!emailVerified && (
						<div>
							<p>Your email is not verified. Please verify your email.</p>
							<button
								onClick={sendVerificationEmail}
								className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
							>
								Verify Email
							</button>
						</div>
					)}
					<h2 className="text-xl">
						Your profile is not complete.{" "}
						<button onClick={openModal} className="text-blue-500 underline">
							Complete now
						</button>
					</h2>
					{error && <div className="text-red-500">{error}</div>}
				</div>
			</div>
			{isModalOpen && <ProfileModal onClose={closeModal} />}
		</>
	);
};

export default Welcome;
