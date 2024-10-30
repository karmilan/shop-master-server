import Expense from '../models/expenseModel.js';
import Shop from '../models/shopModel.js';


// Get all expense
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find().populate('shop');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json(error);
    }
};

// add new expense
const addExpense = async (req, res) => {
    const { shop, category, amount, date, description } = req.body
    try {

        // Check if the shop exists
        const assignedShop = await Shop.findById(shop);

        if (!assignedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        const expense = await Expense.create({ shop: assignedShop, category, amount, date, description })
        res.status(201).json({ message: 'expense added', expense })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get expense by shop
const getExpensesByShop = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.find({ shop: id }).populate('shop')
        if (!expense) {
            res.status(404)
            return res.status(404).json({ message: "expense not found" })
        }
        res.status(200).json({ expense })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid expense ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get single expense
const getSingleExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findById(id).populate('shop')
        if (!expense) {
            res.status(404)
            return res.status(404).json({ message: "expense not found" })
        }
        res.status(200).json({ expense })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid expense ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update expense
const updateExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findById(id)
        if (!expense) {
            res.status(404)
            return res.status(404).json({ message: "expense not found" })
        }
        expense.category = req.body.category || expense.category
        expense.amount = req.body.amount || expense.amount
        expense.date = req.body.date || expense.date
        expense.description = req.body.description || expense.description

        const updateExpense = await expense.save();
        res.status(200).json({
            id: updateExpense._id,
            category: updateExpense.category,
            amount: updateExpense.amount,
            date: updateExpense.date,
            description: updateExpense.description

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid expense ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete expense
const deleteExpense = async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expense.findByIdAndDelete(id)
        if (!expense) {
            return res.status(404).json({ message: "expense not found" })
        }
        res.status(200).json({ message: "expense deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid expense ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { getExpenses, addExpense, getExpensesByShop, getSingleExpense, updateExpense, deleteExpense }