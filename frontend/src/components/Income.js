import React, { useEffect, useState, useContext } from "react";
import axios from "axios"; // Add this line
import IncomeForm from "./IncomeForm";
import IncomeList from "./IncomeList";
import { AuthContext } from "../context/AuthContext";
import "./Income.css"; // Import the CSS file for styling

const Income = () => {
  const { token } = useContext(AuthContext);
  const [incomes, setIncomes] = useState([]);

  // Function to fetch incomes from the server
  const fetchIncomes = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/income/get-incomes`,
      {
        headers: { Authorization: token },
      }
    );
    setIncomes(response.data);
  };

  // Fetch incomes on mount
  useEffect(() => {
    fetchIncomes();
  }, [token]);

  return (
    <div className="income-container">
      <div className="income-form-container">
        <IncomeForm refreshIncomes={fetchIncomes} />
      </div>
      <div className="income-list-container">
        <IncomeList
          incomes={incomes}
          refreshIncomes={fetchIncomes}
          token={token}
        />{" "}
        {/* Pass token as a prop */}
      </div>
    </div>
  );
};

export default Income;
