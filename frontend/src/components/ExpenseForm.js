import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./ExpenseForm.css"; // Import the CSS file

const ExpenseForm = ({ refreshExpenses }) => {
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState(""); // State for new category
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  // Predefined categories
  const categories = [
    "Rent",
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    const expenseData = {
      title,
      amount: Number(amount),
      type: "expense",
      date,
      category: newCategory || category, // Use new category if provided
      description,
      user: userId,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/expense/add-expense",
        expenseData,
        { headers: { Authorization: token } }
      );

      // Clear the form
      setTitle("");
      setAmount("");
      setCategory("");
      setNewCategory("");
      setDescription("");
      setDate("");

      // Refresh the expense list
      refreshExpenses();
    } catch (error) {
      console.error("Error adding expense:", error.response.data);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="form-input"
      />

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setNewCategory(""); // Reset new category when selecting an existing one
        }}
        required
        className="form-input"
      >
        <option value="">Select Category</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        className="form-input"
      />
      <button type="submit" className="form-button">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
