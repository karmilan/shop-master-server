import Credit from '../models/creditModel.js';
import Customer from '../models/customerModel.js';
import LoanBook from '../models/loanBookModel.js';


// get credits
const getCredits = async (req, res) => {
    try {
        const credits = await Credit.find({}).populate('customer', 'name').exec();
        // const credits = await Credit.find().populate('customer');
        res.status(200).json(credits);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// add new credit
const addCredit = async (req, res) => {
    const { customer, amount } = req.body
    const { id } = req.params
    try {

        // Check if the Customer exists
        const assignedCustomer = await Customer.findById(customer);

        if (!assignedCustomer) {
            return res.status(404).json({ error: 'customer not found' });
        }

        const credit = await Credit.create({ customer: assignedCustomer, amount })
        res.status(201).json({ message: 'credit added', credit })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// add new credit for loan book
const addCreditForLoanBook = async (req, res) => {
    const { loanbook, amount } = req.body
    const { id } = req.params
    try {

        // Check if the Customer exists
        const assignedLoanBook = await LoanBook.findById(loanbook);

        if (!assignedLoanBook) {
            return res.status(404).json({ error: 'loan book not found' });
        }

        const credit = await Credit.create({ loanBook: assignedLoanBook, amount })
        res.status(201).json({ message: 'credit added', credit })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get credit by customer
const getSingleCredit = async (req, res) => {
    const { id } = req.params
    try {
        const credit = await Credit.findById(id).populate('customer')
        if (!credit) {
            res.status(404)
            return res.status(404).json({ message: "credit not found" })
        }
        res.status(200).json({ credit })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get credit by shop
const getCreditsByShop = async (req, res) => {
    const { shop } = req.params
    console.log("Received shop ID:", shop);


    try {
        // const credit = await Credit.find({}).populate('customer').populate('customer');
        // const credit2 = await Credit.find({})
        const credit = await Credit.find({})
            .populate({
                path: 'loanBook',
                populate: {
                    path: 'customer',
                    populate: {
                        path: 'shop',
                        model: 'Shop'
                    }
                }
            });

        const filteredCredits = credit.filter(credit => credit.loanBook && credit.loanBook.customer.shop._id.toString() === shop);

        if (!filteredCredits || filteredCredits.length === 0) {
            res.status(404)
            return res.status(404).json({ message: "filter cred not found" })
        }

        // res.status(200).json({ credit })
        res.status(200).json({ filteredCredits })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get credit by customer
const getCreditsByCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const credit = await Credit.find({ customer: id }).populate('customer')
        if (!credit) {
            res.status(404)
            return res.status(404).json({ message: "credit not found" })
        }
        res.status(200).json({ credit })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update credit
const updateCredit = async (req, res) => {
    const { id } = req.params
    try {
        const credit = await Credit.findById(id)
        if (!credit) {
            res.status(404)
            return res.status(404).json({ message: "credit not found" })
        }
        credit.amount = req.body.amount || credit.amount

        const updateCredit = await credit.save();
        res.status(200).json({
            id: updateCredit._id,
            amount: updateCredit.amount,

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid employee ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete credit
const deleteCredit = async (req, res) => {
    const { id } = req.params
    try {
        const credit = await Credit.findByIdAndDelete(id)
        if (!credit) {
            return res.status(404).json({ message: "credit not found" })
        }
        res.status(200).json({ message: "credit deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addCredit, addCreditForLoanBook, deleteCredit, getCredits, getCreditsByCustomer, getCreditsByShop, getSingleCredit, updateCredit };

