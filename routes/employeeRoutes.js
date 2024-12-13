import express from 'express';
import { addEmployee, deleteEmployee, getEmployees, getEmployeesByShop, getSingleEmployee, updateEmployee } from '../controllers/employeeControllers.js';

const router = express.Router();

router.get("/employees", getEmployees)
router.post("/addemployee", addEmployee)
router.get("/employee/:id", getSingleEmployee)
router.get("/employeesbyshop/:id", getEmployeesByShop)
router.put("/updateemployee/:id", updateEmployee)
router.delete("/deleteemployee/:id", deleteEmployee)

export default router
