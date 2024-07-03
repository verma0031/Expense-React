import React, { useState, useEffect } from "react";

const DailyExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [editId, setEditId] = useState(null);
	const [error, setError] = useState("");

	const apiURL =
		"https://expense-tracker-adfab-default-rtdb.firebaseio.com/expenses";

	useEffect(() => {
		const fetchExpenses = async () => {
			try {
				const response = await fetch(`${apiURL}.json`);
				if (!response.ok) {
					throw new Error("Failed to fetch expenses.");
				}
				const data = await response.json();
				if (data) {
					const expensesList = Object.keys(data).map((key) => ({
						id: key,
						...data[key],
					}));
					setExpenses(expensesList);
				}
			} catch (error) {
				console.error("Error fetching expenses: ", error);
				setError("Failed to fetch expenses.");
			}
		};

		fetchExpenses();
	}, []);

	const handleAddExpense = async (e) => {
		e.preventDefault();
		const newExpense = {
			amount,
			description,
			category,
		};

		try {
			if (editId) {
				const response = await fetch(`${apiURL}/${editId}.json`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newExpense),
				});

				if (!response.ok) {
					throw new Error("Failed to update expense.");
				}

				setExpenses((prevExpenses) =>
					prevExpenses.map((expense) =>
						expense.id === editId ? { id: editId, ...newExpense } : expense
					)
				);
				setEditId(null);
			} else {
				const response = await fetch(`${apiURL}.json`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newExpense),
				});

				if (!response.ok) {
					throw new Error("Failed to add expense.");
				}

				const data = await response.json();
				setExpenses((prevExpenses) => [
					...prevExpenses,
					{ id: data.name, ...newExpense },
				]);
			}

			setAmount("");
			setDescription("");
			setCategory("");
		} catch (error) {
			console.error("Error adding/updating expense: ", error);
			setError("Failed to add/update expense.");
		}
	};

	const handleEditExpense = (expense) => {
		setAmount(expense.amount);
		setDescription(expense.description);
		setCategory(expense.category);
		setEditId(expense.id);
	};

	const handleDeleteExpense = async (id) => {
		try {
			const response = await fetch(`${apiURL}/${id}.json`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete expense.");
			}

			setExpenses((prevExpenses) =>
				prevExpenses.filter((expense) => expense.id !== id)
			);
			console.log("Expense successfully deleted");
		} catch (error) {
			console.error("Error deleting expense: ", error);
			setError("Failed to delete expense.");
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="w-full max-w-md">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold mb-6 text-center">
						{editId ? "Edit Expense" : "Add Daily Expense"}
					</h2>
					<form onSubmit={handleAddExpense}>
						<div className="mb-4">
							<label className="block text-gray-700">Amount Spent</label>
							<input
								type="number"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Description</label>
							<input
								type="text"
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>
						<div className="mb-4">
							<label className="block text-gray-700">Category</label>
							<select
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								required
							>
								<option value="" disabled>
									Select Category
								</option>
								<option value="Food">Food</option>
								<option value="Petrol">Petrol</option>
								<option value="Salary">Salary</option>
								<option value="Others">Others</option>
							</select>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							{editId ? "Update Expense" : "Add Expense"}
						</button>
					</form>
				</div>
				{error && <div className="text-red-500 text-center mt-4">{error}</div>}
				<div className="mt-6">
					<h2 className="text-2xl font-bold mb-4 text-center">Expenses</h2>
					<ul>
						{expenses.map((expense) => (
							<li
								key={expense.id}
								className="bg-white p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center"
							>
								<div>
									<p>
										<strong>Amount:</strong> ${expense.amount}
									</p>
									<p>
										<strong>Description:</strong> {expense.description}
									</p>
									<p>
										<strong>Category:</strong> {expense.category}
									</p>
								</div>
								<div>
									<button
										onClick={() => handleEditExpense(expense)}
										className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
									>
										Edit
									</button>
									<button
										onClick={() => handleDeleteExpense(expense.id)}
										className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DailyExpenses;
