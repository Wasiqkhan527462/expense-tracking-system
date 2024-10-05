const {
  addExpense,
  getExpenses, // Ensure this matches your controller
  deleteExpense,
} = require("../controllers/expenseController");

const { authenticateUser } = require("../middleware/auth");
const router = require("express").Router();

router.post("/add-expense", authenticateUser, addExpense);
router.get("/get-expenses", authenticateUser, getExpenses); // This should match
router.delete("/delete-expense/:id", authenticateUser, deleteExpense);

module.exports = router;
