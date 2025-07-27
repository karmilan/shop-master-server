import mongoose from 'mongoose'

const loanSettlementSchema = mongoose.Schema({
    // customer: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Customer',
    //     required: false
    // },

    loanBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanBook',
        // required: false
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