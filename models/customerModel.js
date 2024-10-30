import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
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
    }
},
    { timestamps: true }
)

const Customer = mongoose.model("Customer", customerSchema)

export default Customer