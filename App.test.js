import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App"; // Adjust import path as per your app structure

// Test 1: Renders App component without crashing
test("renders App component without crashing", () => {
	render(<App />);
	const linkElement = screen.getByText(/Welcome to Expense Tracker/i);
	expect(linkElement).toBeInTheDocument();
});

// Test 2: Adds an item to the cart
test("adds an item to the cart", () => {
	render(<App />);
	// Simulate adding an item to the cart
	fireEvent.click(screen.getByText(/Add to Cart/i));
	const cartItem = screen.getByText(/Item Name/i);
	expect(cartItem).toBeInTheDocument();
});

// Test 3: Fetches and displays expenses from API
test("fetches and displays expenses from API", async () => {
	render(<App />);
	// Mock API response for fetching expenses
	// Ensure fetched data is displayed correctly
	// Example: mockFetchExpenses();
	// Wait for data to be rendered and validate
	const expenseItem = await screen.findByText(/Expense Name/i);
	expect(expenseItem).toBeInTheDocument();
});

// Test 4: Submits expense form with valid data
test("submits expense form with valid data", () => {
	render(<App />);
	// Simulate form submission with valid data
	fireEvent.change(screen.getByLabelText(/Expense Name/i), {
		target: { value: "New Expense" },
	});
	fireEvent.click(screen.getByText(/Submit/i));
	const successMessage = screen.getByText(/Expense added successfully/i);
	expect(successMessage).toBeInTheDocument();
});

// Test 5: Displays error message on invalid form submission
test("displays error message on invalid form submission", () => {
	render(<App />);
	// Simulate form submission with invalid data
	fireEvent.click(screen.getByText(/Submit/i));
	const errorMessage = screen.getByText(/Please enter expense details/i);
	expect(errorMessage).toBeInTheDocument();
});

// Test 6: Updates cart state when item is added
test("updates cart state when item is added", () => {
	render(<App />);
	// Simulate adding an item to the cart and verify state update
	fireEvent.click(screen.getByText(/Add to Cart/i));
	const cartState = screen.getByTestId("cart-state");
	expect(cartState.textContent).toContain("1");
});

// Test 7: Navigates to the cart page on clicking cart icon
test("navigates to the cart page on clicking cart icon", () => {
	render(<App />);
	// Simulate clicking on a cart icon and verify navigation
	fireEvent.click(screen.getByTestId("cart-icon"));
	const cartPageTitle = screen.getByText(/Your Cart/i);
	expect(cartPageTitle).toBeInTheDocument();
});

// Test 8: ExpenseList component snapshot test
test("ExpenseList component snapshot", () => {
	const { container } = render(<ExpenseList />);
	expect(container).toMatchSnapshot();
});

// Test 9: Renders App component with accessible content
test("renders App component with accessible content", () => {
	const { container } = render(<App />);
	expect(container).toHaveAccessibleText();
});

// Test 10: Handles empty cart state gracefully
test("handles empty cart state gracefully", () => {
	render(<App />);
	// Simulate empty cart state and verify user message or UI behavior
	const emptyCartMessage = screen.getByText(/Your cart is empty/i);
	expect(emptyCartMessage).toBeInTheDocument();
});
