// src/components/ProfileModal.js
import React, { useState, useEffect } from "react";

const ProfileModal = ({ onClose }) => {
	const [fullName, setFullName] = useState("");
	const [photoUrl, setPhotoUrl] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const response = await fetch(
					`https://expense-tracker-adfab-default-rtdb.firebaseio.com/profileData.json?auth=${token}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch profile data.");
				}
				const data = await response.json();
				if (data) {
					setFullName(data.fullName || "");
					setPhotoUrl(data.photoUrl || "");
				}
			} catch (err) {
				setError(err.message);
			}
		};

		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");

		const payload = {
			fullName,
			photoUrl,
		};

		try {
			const response = await fetch(
				`https://expense-tracker-adfab-default-rtdb.firebaseio.com/profileData.json?auth=${token}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(payload),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to save profile data.");
			}

			onClose(); // Close the modal after submitting
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96">
				<h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
				{error && <div className="text-red-500 mb-4">{error}</div>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700">Full Name</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Profile Photo URL</label>
						<input
							type="text"
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={photoUrl}
							onChange={(e) => setPhotoUrl(e.target.value)}
							required
						/>
					</div>
					<div className="flex justify-end">
						<button
							type="button"
							className="mr-4 px-4 py-2 text-gray-700"
							onClick={onClose}
						>
							Close
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProfileModal;
