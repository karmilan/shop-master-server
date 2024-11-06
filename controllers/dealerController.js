import Dealer from '../models/dealerModel.js';

// get dealers
const getDealers = async (req, res) => {
    try {
        const dealers = await Dealer.find({})
        res.status(200).json(dealers)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new dealer
const addDealer = async (req, res) => {
    const { name, contactNumber, address, email, creditLimit } = req.body

    try {
        const dealer = await Dealer.create({ name, contactNumber, address, email, creditLimit })
        res.status(201).json({ message: 'dealer added' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single dealer
const getSingleDealer = async (req, res) => {
    const { id } = req.params
    try {
        const dealer = await Dealer.findById(id)
        if (!dealer) {
            res.status(404)
            return res.status(404).json({ message: "Dealer not found" })
        }
        res.status(200).json({ dealer })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid dealer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update dealer
const updateDealer = async (req, res) => {
    const { id } = req.params
    try {
        const dealer = await Dealer.findById(id)
        if (!dealer) {
            res.status(404)
            return res.status(404).json({ message: "Dealer not found" })
        }
        dealer.name = req.body.name || dealer.name
        dealer.contactNumber = req.body.contactNumber || dealer.contactNumber
        dealer.address = req.body.address || dealer.address
        dealer.email = req.body.email || dealer.email
        dealer.creditLimit = req.body.creditLimit || dealer.creditLimit
        const updateDealer = await dealer.save();
        res.status(200).json({
            id: updateDealer._id,
            name: updateDealer.name,
            contactNumber: updateDealer.contactNumber,
            address: updateDealer.address,
            email: updateDealer.email,
            creditLimit: updateDealer.creditLimit,
        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid dealer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete dealer
const deleteDealer = async (req, res) => {
    const { id } = req.params
    try {
        const dealer = await Dealer.findByIdAndDelete(id)
        if (!dealer) {
            return res.status(404).json({ message: "Dealer not found" })
        }
        res.status(200).json({ message: "Dealer deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid dealer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addDealer, deleteDealer, getDealers, getSingleDealer, updateDealer };

