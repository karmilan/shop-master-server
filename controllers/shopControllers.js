import Shop from '../models/shopModel.js';

// get shops
const getShops = async (req, res) => {
    try {
        const shops = await Shop.find({})
        res.status(200).json(shops)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new shop
const addShop = async (req, res) => {
    const { name, address, phone, email } = req.body

    try {
        const shop = await Shop.create({ name, address, phone, email })
        res.status(201).json({ message: 'Shop added' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single shop
const getSingleShop = async (req, res) => {
    const { id } = req.params
    try {
        const shop = await Shop.findById(id)
        if (!shop) {
            res.status(404)
            return res.status(404).json({ message: "Shop not found" })
        }
        res.status(200).json({ shop })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid shop ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update shop
const updateShop = async (req, res) => {
    const { id } = req.params
    try {
        const shop = await Shop.findById(id)
        if (!shop) {
            res.status(404)
            return res.status(404).json({ message: "Shop not found" })
        }
        shop.name = req.body.name || shop.name
        shop.address = req.body.address || shop.address
        shop.phone = req.body.phone || shop.phone
        shop.email = req.body.email || shop.email
        shop.status = req.body.status || shop.status
        const updateShop = await shop.save();
        res.status(200).json({
            id: updateShop._id,
            name: updateShop.name,
            address: updateShop.address,
            phone: updateShop.phone,
            email: updateShop.email,
            status: updateShop.status,
        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid shop ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete shop
const deleteShop = async (req, res) => {
    const { id } = req.params
    try {
        const shop = await Shop.findByIdAndDelete(id)
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" })
        }
        res.status(200).json({ message: "shop deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid shop ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addShop, deleteShop, getShops, getSingleShop, updateShop };

