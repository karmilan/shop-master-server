import CredPayment from '../models/credPaymentModel.js';
import Dealer from '../models/dealerModel.js';


// get credPayments
const getCredPayments = async (req, res) => {
    try {
        const credPayments = await CredPayment.find({}).populate('dealer', 'name').exec()
        res.status(200).json(credPayments)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new credPayment
const addCredPayment = async (req, res) => {
    const { id, amount, dueDate, paymentDate, isPaid, dealer } = req.body
    // const { id } = req.params
    try {

        // Check if the dealer exists
        const assignedDealer = await Dealer.findById(dealer);

        if (!assignedDealer) {
            return res.status(404).json({ error: 'Dealer not found ll' });
        }

        const credPayment = await CredPayment.create({ id, amount, dueDate, paymentDate, isPaid, dealer: assignedDealer })
        res.status(201).json({ message: 'credPayment added', credPayment })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single credPayment
const getSingleCredPayment = async (req, res) => {
    const { id } = req.params
    try {
        const credPayment = await CredPayment.findById(id).populate('dealer')
        if (!credPayment) {
            res.status(404)
            return res.status(404).json({ message: "credPayment not found" })
        }
        res.status(200).json({ credPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get cred payments by dealer
const getCredPaymentsByDealer = async (req, res) => {
    const { id } = req.params
    try {
        const credPayment = await CredPayment.find({ dealer: id }).populate('dealer')
        if (!credPayment) {
            res.status(404)
            return res.status(404).json({ message: "cred payment not found" })
        }
        res.status(200).json({ credPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cred payment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update credPayment
const updateCredPayment = async (req, res) => {
    const { id } = req.params
    try {
        const credPayment = await CredPayment.findById(id)
        if (!credPayment) {
            res.status(404)
            return res.status(404).json({ message: "credPayment not found" })
        }
        credPayment.amount = req.body.amount || credPayment.amount
        credPayment.dueDate = req.body.dueDate || credPayment.dueDate
        credPayment.paymentDate = req.body.paymentDate || credPayment.paymentDate
        credPayment.isPaid = req.body.isPaid || credPayment.isPaid
        const updateCredPayment = await credPayment.save();
        res.status(200).json({
            id: updateCredPayment._id,
            amount: updateCredPayment.amount,
            dueDate: updateCredPayment.dueDate,
            paymentDate: updateCredPayment.paymentDate,
            isPaid: updateCredPayment.isPaid

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete credPayment
const deleteCredPayment = async (req, res) => {
    const { id } = req.params
    try {
        const credPayment = await CredPayment.findByIdAndDelete(id)
        if (!credPayment) {
            return res.status(404).json({ message: "credPayment not found" })
        }
        res.status(200).json({ message: "credPayment deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid credPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addCredPayment, deleteCredPayment, getCredPayments, getCredPaymentsByDealer, getSingleCredPayment, updateCredPayment };

