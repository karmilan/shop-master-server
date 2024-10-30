import mongoose from 'mongoose';

const profitSchema = new mongoose.Schema({
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop', // Reference to the Shop model
        required: true
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
    }
}, { timestamps: true });

const Profit = mongoose.model('Profit', profitSchema);

export default Profit;
