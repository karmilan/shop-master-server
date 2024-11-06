import express from 'express';
import { addCredPayment, deleteCredPayment, getCredPayments, getCredPaymentsByDealer, getSingleCredPayment, updateCredPayment } from '../controllers/credPaymentControllers.js';

const router = express.Router();

router.get("/credpayments", getCredPayments)
router.post("/addcredpayment", addCredPayment)
router.get("/credpaymentsbydealer/:id", getCredPaymentsByDealer)
router.get("/credpayment/:id", getSingleCredPayment)
router.put("/updatecredpayment/:id", updateCredPayment)
router.delete("/deletecredpayment/:id", deleteCredPayment)

export default router
