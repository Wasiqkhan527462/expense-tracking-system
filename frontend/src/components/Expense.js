import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import { AuthContext } from "../context/AuthContext";
import "./Expense.css";

const Expense = () => {
  const { token } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/expense/get-expenses`,
      {
        headers: { Authorization: token },
      }
    );
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, [token]);

  return (
    <div className="expense-container">
      <div className="expense-form-container">
        <ExpenseForm refreshExpenses={fetchExpenses} />
      </div>
      <div className="expense-list-container">
        <ExpenseList
          expenses={expenses}
          refreshExpenses={fetchExpenses}
          token={token}
        />
      </div>
    </div>
  );
};

export default Expense;
