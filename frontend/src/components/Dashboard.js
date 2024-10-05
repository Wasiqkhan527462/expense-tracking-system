import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Overview from "./Overview"; // Your Overview component
import Income from "./Income"; // Your Income component
import Expense from "./Expense"; // Your Expense component
import "./styles.css"; // Your styles for the dashboard

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "income":
        return <Income />;
      case "expense":
        return <Expense />;
      default:
        return <Overview />;
    }
  };

  const logout = () => {
    // Your logout logic here
  };

  return (
    <div className="dashboard">
      <Sidebar
        setActiveTab={setActiveTab}
        logout={logout}
        activeTab={activeTab}
      />
      <div className="dashboard-content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
