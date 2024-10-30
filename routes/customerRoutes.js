import express from 'express';
import { addCustomer, deleteCustomer, getCustomers, getSingleCustomer, updateCustomer } from '../controllers/customerControllers.js';

const router = express.Router();

router.get("/customers", getCustomers)
router.post("/addcustomer", addCustomer)
router.get("/customer/:id", getSingleCustomer)
router.put("/updatecustomer/:id", updateCustomer)
router.delete("/deletecustomer/:id", deleteCustomer)

export default router
 