import mongoose from "mongoose";

const loanBookSchema = mongoose.Schema({
    lbId: {
        type: String,
        required: true,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    creditLimit: {
        type: Number,
        required: true
    },
    outstandingBalance: {
        type: Number,
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive", "settled"]
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isClosed: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
);

const LoanBook = mongoose.model("LoanBook", loanBookSchema);

export default LoanBook;