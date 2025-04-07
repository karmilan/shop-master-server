import Customer from '../models/customerModel.js';
import LoanBook from '../models/loanBookModel.js';

// Create a new loan book entry
const addLoanBook = async (req, res) => {

    const { lbId, customer, creditLimit, outstandingBalance, status, isApproved, isClosed } = req.body;
    try {
        // Check if the Customer exists
        const assignedCustomer = await Customer.findById(customer);
        if (!assignedCustomer) {
            return res.status(404).json({ error: 'customer not found' });
        }

        const loanBook = await LoanBook.create({ customer: assignedCustomer, lbId, creditLimit, outstandingBalance, status, isApproved });
        return res.status(201).json({ message: 'Loan book added', loanBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all loan book entries
const getAllLoanBooks = async (req, res) => {
    try {
        const loanBooks = await LoanBook.find({}).populate('customer', 'name').exec();;
        res.status(200).json(loanBooks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get loan book by shop
const getLoanBooksByShop = async (req, res) => {
    const { shop } = req.params
    console.log("Received shop ID:", shop);


    try {
        const loanBook = await LoanBook.find({}).populate('customer');
        const filteredLoanBooks = loanBook.filter(data => data.customer.shop.toString() === shop);

        // console.log("filteredCredits>>>", filteredCredits);

        if (!LoanBook) {
            res.status(404)
            return res.status(404).json({ message: "loan book not found" })
        }
        res.status(200).json({ filteredLoanBooks })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loan book ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get loanBook by customer
const getSingleLoanBookByCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const loanBook = await LoanBook.find({ customer: id }).populate('customer')
        if (!loanBook) {
            res.status(404)
            return res.status(404).json({ message: "Loan Book not found" })
        }
        res.status(200).json({ loanBook })
    } catch (error) {
        console.log(error);

        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid customer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// Get a single loan book entry by ID
const getSingleLoanBook = async (req, res) => {
    try {
        const loanBook = await LoanBook.findById(req.params.id).populate('customer')
        if (!loanBook) {
            return res.status(404).json({ message: 'Loan book not found' });
        }
        res.status(200).json(loanBook);
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loan book ID" })
        }
        res.status(500).json({ message: error.message })
    }
};

// Update a loan book entry by ID
const updateLoanBookById = async (req, res) => {
    try {
        const loanBook = await LoanBook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!loanBook) {
            return res.status(404).json({ message: 'Loan book not found' });
        }
        res.status(200).json({ creditLimit: loanBook.creditLimit, outstandingBalance: loanBook.outstandingBalance, status: loanBook.status, isApproved: loanBook.isApproved, isClosed: loanBook.isClosed });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a loan book entry by ID
const deleteLoanBookById = async (req, res) => {
    try {
        const loanBook = await LoanBook.findByIdAndDelete(req.params.id);
        if (!loanBook) {
            return res.status(404).json({ message: 'Loan book not found' });
        }
        res.status(200).json({ message: 'Loan book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    addLoanBook, deleteLoanBookById, getAllLoanBooks, getLoanBooksByShop, getSingleLoanBook, getSingleLoanBookByCustomer, updateLoanBookById
};

