import express from 'express';
import { addLoanSettlement, deleteLoanSettlement, getLoanSettlements, getLoanSettlementsByCustomer, getLoanSettlementsByShop, getSingleLoanSettlement, updateLoanSettlement } from '../controllers/loanSettlementControllers.js';

const router = express.Router();

router.get("/loansettlements", getLoanSettlements)
router.post("/addloansettlement", addLoanSettlement)
router.get("/loansettlementbycustomer/:id", getLoanSettlementsByCustomer)
router.get("/loansettlementbyshop/:shop", getLoanSettlementsByShop)
router.get("/loansettlement/:id", getSingleLoanSettlement)
router.put("/updateloansettlement/:id", updateLoanSettlement)
router.delete("/deleteloansettlement/:id", deleteLoanSettlement)

export default router
