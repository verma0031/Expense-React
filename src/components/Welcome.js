// src/components/Welcome.js
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";

const Welcome = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
					<h2 className="text-xl">
						Your profile is not complete.{" "}
						<button onClick={openModal} className="text-blue-500 underline">
							Complete now
						</button>
					</h2>
				</div>
			</div>
			{isModalOpen && <ProfileModal onClose={closeModal} />}
		</>
	);
};

export default Welcome;
