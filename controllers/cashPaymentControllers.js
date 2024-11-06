import CashPayment from '../models/cashPaymentModel.js';
import Dealer from '../models/dealerModel.js';


// get cashPayments
const getCashPayments = async (req, res) => {
    try {
        const cashPayments = await CashPayment.find({})
        res.status(200).json(cashPayments)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new cashPayment
const addCashPayment = async (req, res) => {
    const { id, amount, dealer } = req.body
    // const { id } = req.params
    try {

        // Check if the dealer exists
        const assignedDealer = await Dealer.findById(dealer);

        if (!assignedDealer) {
            return res.status(404).json({ error: 'Dealer not found ll' });
        }

        const cashPayment = await CashPayment.create({ id, amount, dealer: assignedDealer })
        res.status(201).json({ message: 'cashPayment added', cashPayment })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single cashPayment
const getSingleCashPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cashPayment = await CashPayment.findById(id).populate('dealer')
        if (!cashPayment) {
            res.status(404)
            return res.status(404).json({ message: "cashPayment not found" })
        }
        res.status(200).json({ cashPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cashPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get cash payments by dealer
const getCashPaymentsByDealer = async (req, res) => {
    const { id } = req.params
    try {
        const cashPayment = await CashPayment.find({ dealer: id }).populate('dealer')
        if (!cashPayment) {
            res.status(404)
            return res.status(404).json({ message: "cash payment not found" })
        }
        res.status(200).json({ cashPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cash payment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update cashPayment
const updateCashPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cashPayment = await CashPayment.findById(id)
        if (!cashPayment) {
            res.status(404)
            return res.status(404).json({ message: "cashPayment not found" })
        }
        cashPayment.amount = req.body.amount || cashPayment.amount
        cashPayment.paymentDate = req.body.paymentDate || cashPayment.paymentDate
        const updateCashPayment = await cashPayment.save();
        res.status(200).json({
            id: updateCashPayment._id,
            amount: updateCashPayment.amount,
            paymentDate: updateCashPayment.paymentDate

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cashPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete cashPayment
const deleteCashPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cashPayment = await CashPayment.findByIdAndDelete(id)
        if (!cashPayment) {
            return res.status(404).json({ message: "cashPayment not found" })
        }
        res.status(200).json({ message: "cashPayment deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cashPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addCashPayment, deleteCashPayment, getCashPayments, getCashPaymentsByDealer, getSingleCashPayment, updateCashPayment };

