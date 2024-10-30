import mongoose from 'mongoose'

const creditSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer' // Reference to the Customer model for the shop where the employee works
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