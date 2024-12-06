import express from 'express';
import { getPaymentsByDealer } from '../controllers/paymentControllers.js';

const router = express.Router();

router.get("/paymentsbydealer/:id", getPaymentsByDealer)

export default router
