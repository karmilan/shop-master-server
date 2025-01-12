import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Shop from '../models/shopModel.js'
import User from "../models/userModel.js"

const register = async (req, res) => {
    try {

        const { username, password, role } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username, password: hashedPassword, role })
        await newUser.save()
        res.status(201).json({ message: `user registered with username ${username}` })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}
const login = async (req, res) => {
    try {

        let { username, password, shop } = req.body

        // Check if the shop exists
        const assignedShop = await Shop.findById(shop)
        console.log("assignedShop>>>", assignedShop);

        // if (!assignedShop) {
        //     return res.status(404).json({ error: 'Shop not found' });
        // }

        const user = await User.findOne({ username })
        console.log(user.shop);

        if (!user) {
            return res.status(404).json({ message: `user with username ${username} not found` })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: `invalid credential` })
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.status(200).json({ token, user, assignedShop })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export { login, register }

