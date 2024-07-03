import React, { useState } from "react";

const DailyExpenses = () => {
	const [expenses, setExpenses] = useState([]);
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	const handleAddExpense = (e) => {
		e.preventDefault();
		const newExpense = {
			id: Date.now(),
			amount,
			description,
			category,
		};
		setExpenses([...expenses, newExpense]);
		setAmount("");
		setDescription("");
		setCategory("");
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="w-full max-w-md">
				<div className="bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Add Daily Expense
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
							Add Expense
						</button>
					</form>
				</div>
				<div className="mt-6">
					<h2 className="text-2xl font-bold mb-4 text-center">Expenses</h2>
					<ul>
						{expenses.map((expense) => (
							<li
								key={expense.id}
								className="bg-white p-4 rounded-lg shadow-lg mb-4"
							>
								<p>
									<strong>Amount:</strong> ${expense.amount}
								</p>
								<p>
									<strong>Description:</strong> {expense.description}
								</p>
								<p>
									<strong>Category:</strong> {expense.category}
								</p>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default DailyExpenses;
