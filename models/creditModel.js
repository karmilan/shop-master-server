import mongoose from 'mongoose'

const creditSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false
    },

    loanBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanBook',
        required: false
    },

    amount: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)

const Credit = mongoose.model("Credit", creditSchema)

export default Credit