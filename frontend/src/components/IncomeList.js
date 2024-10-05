import React from "react";
import axios from "axios"; // Import axios for HTTP requests
import { formatDistance, format } from "date-fns"; // Import necessary functions from date-fns
import "./IncomeList.css"; // Import the CSS file for styling

const IncomeList = ({ incomes, refreshIncomes, token }) => {
  // Function to delete an income entry
  const deleteIncome = async (id) => {
    await axios.delete(`http://localhost:5000/api/income/delete-income/${id}`, {
      headers: { Authorization: token },
    });
    refreshIncomes(); // Refresh the income list after deletion
  };

  return (
    <div className="income-list">
      <h2>Income List</h2>
      <ul>
        {incomes.map((income) => {
          // Log the income object for debugging

          // Check the structure of the date
          const dateFromDB = income.date.$date || income.date; // Fallback to just income.date

          const incomeDate = new Date(dateFromDB); // Create a Date object from the date string

          // Check if the date is valid
          if (isNaN(incomeDate.getTime())) {
            return (
              <li key={income._id} className="income-item">
                <div className="income-details">
                  <h3>{income.title}</h3>
                  <p>Amount: ${income.amount}</p>
                  <p>Category: {income.category}</p>
                  <p>Description: {income.description}</p>
                  <p>Date: Invalid Date</p>{" "}
                </div>
                <button
                  onClick={() => deleteIncome(income._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            );
          }

          return (
            <li key={income._id} className="income-item">
              <div className="income-details">
                <h3>{income.title}</h3>
                <p>Amount: ${income.amount}</p>
                <p>Category: {income.category}</p>
                <p>Description: {income.description}</p>
                <p>Date: {format(incomeDate, "MMMM dd, yyyy")}</p>
              </div>
              <button
                onClick={() => deleteIncome(income._id)}
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

export default IncomeList;
