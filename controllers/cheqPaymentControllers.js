import CheqPayment from '../models/cheqPaymentModel.js';
import Dealer from '../models/dealerModel.js';


// get cheqPayments
const getCheqPayments = async (req, res) => {
    try {
        const cheqPayments = await CheqPayment.find({})
        res.status(200).json(cheqPayments)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new cheqPayment
const addCheqPayment = async (req, res) => {
    const { id, chequeNumber, bankName, amount, chequeDate, paymentDate, isCleared, dealer } = req.body
    // const { id } = req.params
    try {

        // Check if the dealer exists
        const assignedDealer = await Dealer.findById(dealer);

        if (!assignedDealer) {
            return res.status(404).json({ error: 'Dealer not found ll' });
        }

        const cheqPayment = await CheqPayment.create({ d, chequeNumber, bankName, amount, chequeDate, paymentDate, isCleared, z dealer: assignedDealer })
        res.status(201).json({ message: 'cheqPayment added', cheqPayment })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single cheqPayment
const getSingleCheqPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cheqPayment = await CheqPayment.findById(id).populate('dealer')
        if (!cheqPayment) {
            res.status(404)
            return res.status(404).json({ message: "cheqPayment not found" })
        }
        res.status(200).json({ cheqPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cheqPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get cash payments by dealer
const getCheqPaymentsByDealer = async (req, res) => {
    const { id } = req.params
    try {
        const cheqPayment = await CheqPayment.find({ dealer: id }).populate('dealer')
        if (!cheqPayment) {
            res.status(404)
            return res.status(404).json({ message: "cash payment not found" })
        }
        res.status(200).json({ cheqPayment })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cash payment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update cheqPayment
const updateCheqPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cheqPayment = await CheqPayment.findById(id)
        if (!cheqPayment) {
            res.status(404)
            return res.status(404).json({ message: "cheqPayment not found" })
        }
        cheqPayment.chequeNumber = req.body.chequeNumber || cheqPayment.chequeNumber
        cheqPayment.bankName = req.body.bankName || cheqPayment.bankName
        cheqPayment.amount = req.body.amount || cheqPayment.amount
        cheqPayment.chequeDate = req.body.chequeDate || cheqPayment.chequeDate
        cheqPayment.paymentDate = req.body.paymentDate || cheqPayment.paymentDate
        cheqPayment.isCleared = req.body.isCleared || cheqPayment.isCleared
        const updateCheqPayment = await cheqPayment.save();
        res.status(200).json({
            id: updateCheqPayment._id,
            chequeNumber: updateCheqPayment.chequeNumber,
            bankName: updateCheqPayment.bankName,
            amount: updateCheqPayment.amount,
            chequeDate: updateCheqPayment.chequeDate,
            paymentDate: updateCheqPayment.paymentDate,
            isCleared: updateCheqPayment.isCleared

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cheqPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete cheqPayment
const deleteCheqPayment = async (req, res) => {
    const { id } = req.params
    try {
        const cheqPayment = await CheqPayment.findByIdAndDelete(id)
        if (!cheqPayment) {
            return res.status(404).json({ message: "cheqPayment not found" })
        }
        res.status(200).json({ message: "cheqPayment deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid cheqPayment ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addCheqPayment, deleteCheqPayment, getCheqPayments, getCheqPaymentsByDealer, getSingleCheqPayment, updateCheqPayment };

