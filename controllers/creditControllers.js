import Credit from '../models/creditModel.js';
import Customer from '../models/customerModel.js';
import Employee from '../models/employeeModel.js';
import Shop from '../models/shopModel.js';


// get credits
const getCredits = async (req, res) => {
    try {
        const credits = await Credit.find({});
        // const credits = await Credit.find().populate('customer');
        res.status(200).json( credits );
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

// get credit by customer
const getCreditsByCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const credit = await Credit.find({customer:id}).populate('customer')
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
export { getCredits, addCredit, getSingleCredit, getCreditsByCustomer, updateCredit, deleteCredit }