const IncomeSchema = require("../models/IncomeModel");

// Add new income
exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  // Create a new income document
  const income = new IncomeSchema({
    title,
    amount,
    category,
    description,
    date,
    user: req.user.id, // Associate the income with the logged-in user
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

    // Save the income document
    await income.save();
    res.status(201).json({ message: "Income Added", income }); // Return the added income object
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
};

// Retrieve all incomes for the logged-in user
exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a specific income by ID
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await IncomeSchema.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!income) {
      return res.status(404).json({ message: "Income not found" }); // Handle not found case
    }
    res.status(200).json({ message: "Income Deleted" }); // Confirm deletion
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" });
  }
};
