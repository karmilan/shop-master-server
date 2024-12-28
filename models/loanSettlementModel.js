import mongoose from 'mongoose'

const loanSettlementSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer' // Reference to the Customer model for the loan settlement where the customer applicable
    },
    amount: {
        type: Number,
        required: true
    },
    isFullAmountSettled: {
        type: Boolean,
        default: false,
    }
},
    { timestamps: true }
)

const LoanSettlement = mongoose.model("LoanSettlement", loanSettlementSchema)

export default LoanSettlement