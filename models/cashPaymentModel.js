import mongoose from 'mongoose'

const cashPaymentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer', // Reference to the Dealer model for the shop where the cash payment applied
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
},
    { timestamps: true }
)

const CashPayment = mongoose.model("CashPayment", cashPaymentSchema)


export default CashPayment