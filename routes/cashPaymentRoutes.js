import express from 'express';
import { addCashPayment, deleteCashPayment, getCashPayments, getCashPaymentsByDealer, getSingleCashPayment, updateCashPayment } from '../controllers/cashPaymentControllers.js';

const router = express.Router();

router.get("/cashpayments", getCashPayments)
router.post("/addcashpayment", addCashPayment)
router.get("/cashpaymentsbydealer/:id", getCashPaymentsByDealer)
router.get("/cashpayment/:id", getSingleCashPayment)
router.put("/updatecashpayment/:id", updateCashPayment)
router.delete("/deletecashpayment/:id", deleteCashPayment)

export default router
