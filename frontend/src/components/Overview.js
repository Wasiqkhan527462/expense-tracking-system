import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // Import necessary components
import "./overview.css"; // Import the CSS file

const Overview = () => {
  const { token } = useContext(AuthContext);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [data, setData] = useState([]); // State for area chart data

  useEffect(() => {
    const fetchOverviewData = async () => {
      const incomeResponse = await axios.get(
        "http://localhost:5000/api/income/get-incomes",
        {
          headers: { Authorization: token },
        }
      );
      const expenseResponse = await axios.get(
        "http://localhost:5000/api/expense/get-expenses",
        {
          headers: { Authorization: token },
        }
      );

      // Calculate total income and expenses
      const totalIncome = incomeResponse.data.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );
      const totalExpense = expenseResponse.data.reduce(
        (acc, curr) => acc + curr.amount,
        0
      );

      setTotalIncome(totalIncome);
      setTotalExpense(totalExpense);

      // Prepare data for area chart
      const incomeData = incomeResponse.data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(), // Format date
        income: item.amount,
        expense: 0,
      }));

      const expenseData = expenseResponse.data.map((item) => ({
        date: new Date(item.date).toLocaleDateString(),
        income: 0,
        expense: item.amount,
      }));

      // Combine income and expense data into a single array
      const combinedData = [...incomeData, ...expenseData].reduce(
        (acc, curr) => {
          const existing = acc.find((item) => item.date === curr.date);
          if (existing) {
            existing.income += curr.income;
            existing.expense += curr.expense;
          } else {
            acc.push(curr);
          }
          return acc;
        },
        []
      );

      // Sort data by date
      combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

      setData(combinedData);
    };

    fetchOverviewData();
  }, [token]);

  const savings = totalIncome - totalExpense;

  return (
    <div className="overview">
      <h1>Overview</h1>
      <div className="card">
        <h2>Total Income</h2>
        <p>${totalIncome}</p>
      </div>
      <div className="card">
        <h2>Total Expense</h2>
        <p>${totalExpense}</p>
      </div>
      <div className="card">
        <h2>Savings</h2>
        <p>${savings}</p>
      </div>

      <h2>Income & Expense Over Time</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#4caf50"
            fillOpacity={0.6}
            fill="#4caf50"
          />
          <Area
            type="monotone"
            dataKey="expense"
            stroke="#f44336"
            fillOpacity={0.6}
            fill="#f44336"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;
