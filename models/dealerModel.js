import mongoose from 'mongoose'

const dealerSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    creditLimit: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)

const Dealer = mongoose.model("Dealer", dealerSchema)

export default Dealer