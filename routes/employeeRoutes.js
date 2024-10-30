import express from 'express';
import Shop from '../models/shopModel.js';
import { getShops, addShop, getSingleShop, updateShop, deleteShop } from '../controllers/shopControllers.js';
import Employee from '../models/employeeModel.js';
import { getEmployees, addEmployee, getSingleEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeControllers.js'

const router = express.Router();

router.get("/employees", getEmployees)
router.post("/addemployee", addEmployee)
router.get("/employee/:id", getSingleEmployee)
router.put("/updateemployee/:id", updateEmployee)
router.delete("/deleteemployee/:id", deleteEmployee)

export default router
