import express from 'express';
import { addCustomer, deleteCustomer, getCustomers, getSingleCustomer, updateCustomer } from '../controllers/customerControllers.js';
import { addCredit, deleteCredit, getCredits, getCreditsByCustomer, getSingleCredit, updateCredit } from '../controllers/creditControllers.js';

const router = express.Router();

router.get("/credits", getCredits)
router.post("/addcredit", addCredit)
router.get("/creditbycustomer/:id", getCreditsByCustomer)
router.get("/credit/:id", getSingleCredit)
router.put("/updatecredit/:id", updateCredit)
router.delete("/deletecredit/:id", deleteCredit)

export default router
 