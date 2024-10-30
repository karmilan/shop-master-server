import express from 'express';
import Shop from '../models/shopModel.js';
import { getShops, addShop, getSingleShop, updateShop, deleteShop } from '../controllers/shopControllers.js';
import Employee from '../models/employeeModel.js';
import { getEmployees, addEmployee, getSingleEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeControllers.js'
import { addProfit, deleteProfit, getProfits, getProfitsByShop, getSingleProfit, updateProfit } from '../controllers/profitControllers.js';

const router = express.Router();

router.get("/profits", getProfits)
router.post("/addprofit", addProfit)
router.get("/profitsbyshop/:id", getProfitsByShop)
router.get("/profit/:id", getSingleProfit)
router.put("/updateprofit/:id", updateProfit)
router.delete("/deleteprofit/:id", deleteProfit)

export default router
