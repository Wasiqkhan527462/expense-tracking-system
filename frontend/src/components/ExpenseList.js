import React from "react";
import axios from "axios"; // Import axios
import { format } from "date-fns"; // Import necessary functions from date-fns
import "./ExpenseList.css"; // Import the CSS file for styling

const ExpenseList = ({ expenses, refreshExpenses, token }) => {
  const deleteExpense = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/expense/delete-expense/${id}`,
      {
        headers: { Authorization: token },
      }
    );
    refreshExpenses(); // Refresh the expense list after deletion
  };

  return (
    <div className="expense-list">
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => {
          // Check the structure of the date
          const dateFromDB = expense.date.$date || expense.date; // Fallback to just expense.date
          const expenseDate = new Date(dateFromDB); // Create a Date object from the date string

          // Check if the date is valid
          if (isNaN(expenseDate.getTime())) {
            return (
              <li key={expense._id} className="expense-item">
                <div className="expense-details">
                  <h3>{expense.title}</h3>
                  <p>Amount: ${expense.amount}</p>
                  <p>Category: {expense.category}</p>
                  <p>Description: {expense.description}</p>
                  <p>Date: Invalid Date</p>{" "}
                  {/* Display a fallback if date is invalid */}
                </div>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            );
          }

          return (
            <li key={expense._id} className="expense-item">
              <div className="expense-details">
                <h3>{expense.title}</h3>
                <p>Amount: ${expense.amount}</p>
                <p>Category: {expense.category}</p>
                <p>Description: {expense.description}</p>
                <p>Date: {format(expenseDate, "MMMM dd, yyyy")}</p>{" "}
                {/* Display date in a human-readable format */}
              </div>
              <button
                onClick={() => deleteExpense(expense._id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExpenseList;
