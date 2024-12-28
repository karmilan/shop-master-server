import Customer from '../models/customerModel.js';
import LoanSettlement from '../models/loanSettlementModel.js';


// get loanSettlements
const getLoanSettlements = async (req, res) => {
    try {
        const loanSettlements = await LoanSettlement.find({}).populate('customer', 'name').exec();
        // const loanSettlements = await LoanSettlement.find().populate('customer');
        res.status(200).json(loanSettlements);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new loanSettlement
const addLoanSettlement = async (req, res) => {
    const { customer, amount, isFullAmountSettled } = req.body
    const { id } = req.params
    try {

        // Check if the Customer exists
        const assignedCustomer = await Customer.findById(customer);

        if (!assignedCustomer) {
            return res.status(404).json({ error: 'customer not found' });
        }

        const loanSettlement = await LoanSettlement.create({ customer: assignedCustomer, amount, isFullAmountSettled })
        res.status(201).json({ message: 'loanSettlement added', loanSettlement })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get loanSettlement by customer
const getSingleLoanSettlement = async (req, res) => {
    const { id } = req.params
    try {
        const loanSettlement = await LoanSettlement.findById(id).populate('customer')
        if (!loanSettlement) {
            res.status(404)
            return res.status(404).json({ message: "loanSettlement not found" })
        }
        res.status(200).json({ loanSettlement })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loanSettlement ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get loanSettlement by shop
const getLoanSettlementsByShop = async (req, res) => {
    const { shop } = req.params
    console.log("Received shop ID:", shop);


    try {
        const loanSettlement = await LoanSettlement.find({}).populate('customer');
        const filteredLoanSettlements = loanSettlement.filter(loanSettlement => loanSettlement.customer.shop.toString() === shop);

        console.log("filteredLoanSettlements>>>", filteredLoanSettlements);

        if (!loanSettlement) {
            res.status(404)
            return res.status(404).json({ message: "loanSettlement not found" })
        }
        res.status(200).json({ filteredLoanSettlements })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loanSettlement ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get loanSettlement by customer
const getLoanSettlementsByCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const loanSettlement = await LoanSettlement.find({ customer: id }).populate('customer')
        if (!loanSettlement) {
            res.status(404)
            return res.status(404).json({ message: "loanSettlement not found" })
        }
        res.status(200).json({ loanSettlement })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loanSettlement ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update loanSettlement
const updateLoanSettlement = async (req, res) => {
    const { id } = req.params
    try {
        const loanSettlement = await LoanSettlement.findById(id)
        if (!loanSettlement) {
            res.status(404)
            return res.status(404).json({ message: "loanSettlement not found" })
        }
        loanSettlement.amount = req.body.amount || loanSettlement.amount
        loanSettlement.isFullAmountSettled = req.body.isFullAmountSettled || loanSettlement.isFullAmountSettled

        const updateLoanSettlement = await loanSettlement.save();
        res.status(200).json({
            id: updateLoanSettlement._id,
            amount: updateLoanSettlement.amount,
            isFullAmountSettled: updateLoanSettlement.isFullAmountSettled,

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid employee ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete loanSettlement
const deleteLoanSettlement = async (req, res) => {
    const { id } = req.params
    try {
        const loanSettlement = await LoanSettlement.findByIdAndDelete(id)
        if (!loanSettlement) {
            return res.status(404).json({ message: "loanSettlement not found" })
        }
        res.status(200).json({ message: "loanSettlement deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid loanSettlement ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addLoanSettlement, deleteLoanSettlement, getLoanSettlements, getLoanSettlementsByCustomer, getLoanSettlementsByShop, getSingleLoanSettlement, updateLoanSettlement };

