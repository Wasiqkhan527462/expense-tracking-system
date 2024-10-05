import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token")); // Retrieve token from local storage
  const [userId, setUserId] = useState(() => localStorage.getItem("userId")); // Retrieve user ID from local storage
  const navigate = useNavigate();

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        { username, email, password }
      );
      const token = response.data.token;
      const userId = response.data.user.id; // Get user ID from response
      setToken(token);
      setUserId(userId); // Update user ID in state
      localStorage.setItem("token", token); // Store token in local storage
      localStorage.setItem("userId", userId); // Store user ID in local storage
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      const userId = response.data.user.id; // Get user ID from response
      setToken(token);
      setUserId(userId); // Update user ID in state
      localStorage.setItem("token", token); // Store token in local storage
      localStorage.setItem("userId", userId); // Store user ID in local storage
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null); // Clear user ID from state
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("userId"); // Remove user ID from local storage
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, userId, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
