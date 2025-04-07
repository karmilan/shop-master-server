import express from 'express';
import { addLoanBook, deleteLoanBookById, getAllLoanBooks, getLoanBooksByShop, getSingleLoanBook, getSingleLoanBookByCustomer, updateLoanBookById } from '../controllers/loanBookControllers.js';

const router = express.Router();

router.get("/loanbooks", getAllLoanBooks)
router.post("/addloanbook", addLoanBook)
router.get("/loanbookbycustomer/:id", getSingleLoanBookByCustomer)
router.get("/loanbookbyshop/:shop", getLoanBooksByShop)
router.get("/loanbook/:id", getSingleLoanBook)
router.put("/updateloanbook/:id", updateLoanBookById)
router.delete("/deleteloanbook/:id", deleteLoanBookById)

export default router