import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice"; // Import logout action from your authSlice
import { toggleCartVisibility } from "../redux/cart/cartSlice";
import ProfileModal from "./ProfileModal";
import { NavLink } from "react-router-dom";
import Cart from "./Cart";

const Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [emailVerified, setEmailVerified] = useState(false);
	const [error, setError] = useState("");
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const isCartVisible = useSelector((state) => state.cart.isCartVisible);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogoutClick = () => {
		dispatch(logout()); // Dispatch logout action
		navigate("/login");
	};

	useEffect(() => {
		const checkEmailVerification = async () => {
			const token = localStorage.getItem("token");
			if (!token) return;

			try {
				const response = await fetch(
					`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE`, // Replace with your API key
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
				`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCRda7dXO9z4GRWJ46gfbipTX-sn8viCSE`, // Replace with your API key
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

	const handleCartClick = () => {
		dispatch(toggleCartVisibility());
	};

	return (
		<>
			<div className="absolute top-4 right-4">
				<button
					onClick={handleLogoutClick}
					className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
				>
					Logout
				</button>
			</div>

			<header className="w-full bg-gray-100 shadow-md p-4">
				<div className="container mx-auto flex flex-col items-center justify-center">
					<div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl">
						<h1 className="text-4xl font-bold mb-4 text-center">
							Welcome to Expense Tracker
						</h1>
						{!emailVerified && (
							<div className="mb-4 text-center">
								<p className="text-lg text-red-500">
									Your email is not verified. Please verify your email.
								</p>
								<button
									onClick={sendVerificationEmail}
									className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 transition duration-300"
								>
									Verify Email
								</button>
							</div>
						)}
						<h2 className="text-xl text-center mb-4">
							Your profile is not complete.{" "}
							<button
								onClick={openModal}
								className="text-blue-500 underline hover:text-blue-700 transition duration-300"
							>
								Complete now
							</button>
						</h2>
						{error && <div className="text-red-500 text-center">{error}</div>}
					</div>
				</div>
			</header>

			<NavLink to="/daily-expenses">
				<button>Add Expenses</button>
			</NavLink>

			<div className="absolute top-16 right-4">
				<button
					onClick={handleCartClick}
					className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					{isCartVisible ? "Hide Cart" : "Show Cart"}
				</button>
				{/* Cart Component */}
				{isCartVisible && <Cart />}
			</div>

			{/* Profile Modal */}
			{isModalOpen && <ProfileModal onClose={closeModal} />}
		</>
	);
};

export default Header;
