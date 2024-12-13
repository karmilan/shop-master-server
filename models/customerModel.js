import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
    customerId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    creditLimit: {
        type: Number,
        required: false
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop' // Reference to the Shop model for the shop where the customer applies
    },
},
    { timestamps: true }
)

const Customer = mongoose.model("Customer", customerSchema)

export default Customer