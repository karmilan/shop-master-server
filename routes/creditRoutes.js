import express from 'express';
import { addCredit, deleteCredit, getCredits, getCreditsByCustomer, getCreditsByShop, getSingleCredit, updateCredit } from '../controllers/creditControllers.js';

const router = express.Router();

router.get("/credits", getCredits)
router.post("/addcredit", addCredit)
router.get("/creditbycustomer/:id", getCreditsByCustomer)
router.get("/creditbyshop/:shop", getCreditsByShop)
router.get("/credit/:id", getSingleCredit)
router.put("/updatecredit/:id", updateCredit)
router.delete("/deletecredit/:id", deleteCredit)

export default router
