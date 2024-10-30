import Customer from '../models/customerModel.js';

// get customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({})
        res.status(200).json(customers)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new customer
const addCustomer = async (req, res) => {
    const { name, email, phone, address, creditLimit } = req.body
    console.log("req.body>>>", req.body)
    try {
        const customer = await Customer.create({ name, email, phone, address, creditLimit })
        res.status(201).json({ message: 'customer added' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single customer
const getSingleCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.findById(id)
        if (!customer) {
            res.status(404)
            return res.status(404).json({ message: "cuatomer not found" })
        }
        res.status(200).json({ customer })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid customer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update customer
const updateCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.findById(id)
        if (!customer) {
            res.status(404)
            return res.status(404).json({ message: "customer not found" })
        }

        customer.name = req.body.name || customer.name
        customer.email = req.body.email || customer.email
        customer.phone = req.body.phone || customer.phone
        customer.address = req.body.address || customer.address
        customer.creditLimit = req.body.creditLimit || customer.creditLimit

        const updateCustomer = await customer.save();
        res.status(200).json({
            id: updateCustomer._id,
            name: updateCustomer.name,
            email: updateCustomer.email,
            phone: updateCustomer.phone,
            address: updateCustomer.address,
            creditLimit: updateCustomer.creditLimit,
        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid customer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params
    try {
        const customer = await Customer.findByIdAndDelete(id)
        if (!customer) {
            return res.status(404).json({ message: "customer not found" })
        }
        res.status(200).json({ message: "customer deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid customer ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addCustomer, deleteCustomer, getCustomers, getSingleCustomer, updateCustomer };

