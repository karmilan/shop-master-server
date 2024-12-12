import mongoose from 'mongoose'

const dealerSchema = mongoose.Schema({

    dealerId: {
        type: String,
        required: true,
        unique: true
    },
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
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop' // Reference to the Shop model for the shop where the employee works
    },
},
    { timestamps: true }
)

const Dealer = mongoose.model("Dealer", dealerSchema)

export default Dealer