// src/features/expensesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	expenses: [],
	totalAmount: 0,
};

const expensesSlice = createSlice({
	name: "expenses",
	initialState,
	reducers: {
		addExpense(state, action) {
			state.expenses.push(action.payload);
			state.totalAmount += parseInt(action.payload.amount); // Assuming amount is a string, convert to number
		},
		deleteExpense(state, action) {
			state.expenses = state.expenses.filter(
				(expense) => expense.id !== action.payload
			);
			state.totalAmount -= parseInt(
				state.expenses.find((exp) => exp.id === action.payload).amount
			);
		},
	},
});

export const { addExpense, deleteExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
