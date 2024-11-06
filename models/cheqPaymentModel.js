import mongoose from 'mongoose'

const cheqPaymentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer', // Reference to the Dealer model for the shop where the cheq payment applied
        required: true
    },

    chequeNumber: {
        type: String,
        required: true,
        unique: true
    },
    bankName: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },
    chequeDate: {
        type: Date,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    isCleared: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

const CheqPayment = mongoose.model("CheqPayment", cheqPaymentSchema)


export default CheqPayment