import express from 'express';
import { addDealer, deleteDealer, getDealers, getSingleDealer, updateDealer } from '../controllers/dealerController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get("/dealers", verifyToken, authorizeRoles("admin", "manager"), getDealers)
router.post("/adddealer", addDealer)
router.get("/dealer/:id", getSingleDealer)
router.put("/updatedealer/:id", updateDealer)
router.delete("/deletedealer/:id", deleteDealer)

export default router
