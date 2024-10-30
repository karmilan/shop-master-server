import mongoose from 'mongoose'

const shopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
    }
},
    { timestamps: true }
)

const Shop = mongoose.model("Shop", shopSchema)

export default Shop