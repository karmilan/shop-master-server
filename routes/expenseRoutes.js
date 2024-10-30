import express from 'express';
import Shop from '../models/shopModel.js';
import { getShops, addShop, getSingleShop, updateShop, deleteShop } from '../controllers/shopControllers.js';
import Employee from '../models/employeeModel.js';
import { getEmployees, addEmployee, getSingleEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeControllers.js'
import { addExpense, deleteExpense, getExpenses, getExpensesByShop, getSingleExpense, updateExpense } from '../controllers/expenseControllers.js';

const router = express.Router();

router.get("/expenses", getExpenses)
router.post("/addexpense", addExpense)
router.get("/expensesbyshop/:id", getExpensesByShop)
router.get("/expense/:id", getSingleExpense)
router.put("/updateexpense/:id", updateExpense)
router.delete("/deleteexpense/:id", deleteExpense)

export default router
