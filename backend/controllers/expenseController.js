const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = new ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
    user: req.user.id, // Assuming req.user is set after user authentication
  });

  try {
    // Validations
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || typeof amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

  console.log(expense);
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await ExpenseSchema.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
