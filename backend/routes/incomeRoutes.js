const {
  addIncome,
  getIncomes,
  deleteIncome,
} = require("../controllers/incomeController");

const { authenticateUser } = require("../middleware/auth");
const router = require("express").Router();

// Income routes
router.post("/add-income", authenticateUser, addIncome);
router.get("/get-incomes", authenticateUser, getIncomes);
router.delete("/delete-income/:id", authenticateUser, deleteIncome);

module.exports = router;
