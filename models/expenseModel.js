import mongoose from 'mongoose'

const expenseSchema = mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop', // Reference to the Shop model
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Rent', 'Utilities', 'Supplies', 'Maintenance', 'Salaries', 'Miscellaneous']
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
},
    { timestamps: true }
)

const Expense = mongoose.model("Expense", expenseSchema)


export default Expense