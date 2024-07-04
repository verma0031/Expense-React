// Notification.js

import React from "react";

const Notification = ({ status, title, message, onClose }) => {
	let statusClasses = "";

	if (status === "success") {
		statusClasses = "bg-green-500";
	}
	if (status === "error") {
		statusClasses = "bg-red-500";
	}
	if (status === "pending") {
		statusClasses = "bg-blue-500";
	}

	const cssClasses = `${statusClasses} fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white`;

	return (
		<div className={cssClasses}>
			<h2 className="font-bold">{title}</h2>
			<p>{message}</p>
			<button onClick={onClose} className="mt-2 underline">
				Close
			</button>
		</div>
	);
};

export default Notification;
