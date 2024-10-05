const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel"); // Assuming you have a User model

const authenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
    req.user = await UserModel.findById(decoded.id); // Assuming the token contains user id
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = { authenticateUser };
