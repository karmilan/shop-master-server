import Profit from '../models/profitModel.js';
import Shop from '../models/shopModel.js';


// Get all profit
const getProfits = async (req, res) => {
    try {
        const profits = await Profit.find().populate('shop');
        res.status(200).json(profits);
    } catch (error) {
        res.status(500).json(error);
    }
};

// add new profit
const addProfit = async (req, res) => {
    const { shop, category, amount, date, description } = req.body
    try {

        // Check if the shop exists
        const assignedShop = await Shop.findById(shop);

        if (!assignedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        const profit = await Profit.create({ shop: assignedShop, category, amount, date, description })
        res.status(201).json({ message: 'profit added', profit })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get profit by shop
const getProfitsByShop = async (req, res) => {
    const { id } = req.params
    try {
        const profit = await Profit.find({ shop: id }).populate('shop')
        if (!profit) {
            res.status(404)
            return res.status(404).json({ message: "profit not found" })
        }
        res.status(200).json({ profit })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid profit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// get single profit
const getSingleProfit = async (req, res) => {
    const { id } = req.params
    try {
        const profit = await Profit.findById(id).populate('shop')
        if (!profit) {
            res.status(404)
            return res.status(404).json({ message: "profit not found" })
        }
        res.status(200).json({ profit })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid profit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update profit
const updateProfit = async (req, res) => {
    const { id } = req.params
    try {
        const profit = await Profit.findById(id)
        if (!profit) {
            res.status(404)
            return res.status(404).json({ message: "profit not found" })
        }
        profit.category = req.body.category || profit.category
        profit.amount = req.body.amount || profit.amount
        profit.date = req.body.date || profit.date
        profit.description = req.body.description || profit.description

        const updateProfit = await profit.save();
        res.status(200).json({
            id: updateProfit._id,
            category: updateProfit.category,
            amount: updateProfit.amount,
            date: updateProfit.date,
            description: updateProfit.description

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid profit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete profit
const deleteProfit = async (req, res) => {
    const { id } = req.params
    try {
        const profit = await Profit.findByIdAndDelete(id)
        if (!profit) {
            return res.status(404).json({ message: "profit not found" })
        }
        res.status(200).json({ message: "profit deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid profit ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { getProfits, addProfit, getProfitsByShop, getSingleProfit, updateProfit, deleteProfit }