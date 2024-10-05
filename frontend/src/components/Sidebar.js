import React from "react";
import "./styles.css"; // Import the CSS file

const Sidebar = ({ setActiveTab, logout, activeTab }) => {
  return (
    <div className="sidebar">
      <h2>Expense Tracker</h2>
      <ul className="sidebar-list">
        <li
          className={`sidebar-item ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </li>
        <li
          className={`sidebar-item ${activeTab === "income" ? "active" : ""}`}
          onClick={() => setActiveTab("income")}
        >
          Income
        </li>
        <li
          className={`sidebar-item ${activeTab === "expense" ? "active" : ""}`}
          onClick={() => setActiveTab("expense")}
        >
          Expense
        </li>
        <li className="sidebar-item" onClick={logout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
