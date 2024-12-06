import CashPayment from "../models/cashPaymentModel.js"
import CheqPayment from "../models/cheqPaymentModel.js"
import CredPayment from "../models/credPaymentModel.js"



// get cred payments by dealer
export const getPaymentsByDealer = async (req, res) => {
    const { id } = req.params
    let responseData = {};
    try {
        const cashPayment = await CashPayment.find({ dealer: id }).populate('dealer')
        const cheqPayment = await CheqPayment.find({ dealer: id }).populate('dealer')
        const credPayment = await CredPayment.find({ dealer: id }).populate('dealer')

        const allPayments = [
            ...cashPayment.map(payment => ({ ...payment.toObject(), type: 'Cash Payment' })),
            ...cheqPayment.map(payment => ({ ...payment.toObject(), type: 'Cheque Payment' })),
            ...credPayment.map(payment => ({ ...payment.toObject(), type: 'Credit Payment' })),
        ];


        if (!allPayments) {
            res.status(404)
            return res.status(404).json({ message: "payment not found" })
        }
        console.log(allPayments);

        res.status(200).json(allPayments)
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid Dealer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}