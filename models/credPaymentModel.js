import mongoose from 'mongoose'

const credPaymentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    dealer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dealer', // Reference to the Dealer model for the shop where the cred payment applied
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    isPaid: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

const CredPayment = mongoose.model("CredPayment", credPaymentSchema)


export default CredPayment