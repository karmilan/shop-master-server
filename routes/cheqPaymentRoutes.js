import express from 'express';
import { addCheqPayment, deleteCheqPayment, getCheqPayments, getCheqPaymentsByDealer, getCheqPaymentsByShop, getSingleCheqPayment, updateCheqPayment } from '../controllers/cheqPaymentControllers.js';

const router = express.Router();

router.get("/cheqpayments", getCheqPayments)
router.post("/addcheqpayment", addCheqPayment)
router.get("/cheqpaymentsbydealer/:id", getCheqPaymentsByDealer)
router.get("/cheqpaymentsbyshop/:shop", getCheqPaymentsByShop)
router.get("/cheqpayment/:id", getSingleCheqPayment)
router.put("/updatecheqpayment/:id", updateCheqPayment)
router.delete("/deletecheqpayment/:id", deleteCheqPayment)

export default router
