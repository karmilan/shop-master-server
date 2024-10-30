import Employee from '../models/employeeModel.js';
import Shop from '../models/shopModel.js';


// get employees
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({})
        res.status(200).json(employees)
    } catch (error) {
        res.status(500).json(error)
    }
}

// add new employee
const addEmployee = async (req, res) => {
    const { name, role, address, phone, shop } = req.body
    const { id } = req.params
    try {

        // Check if the shop exists
        const assignedShop = await Shop.findById(shop);

        if (!assignedShop) {
            return res.status(404).json({ error: 'Shop not found ll' });
        }

        const employee = await Employee.create({ name, role, address, phone, shop: assignedShop })
        res.status(201).json({ message: 'employee added', employee })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

// get single employee
const getSingleEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findById(id).populate('shop')
        if (!employee) {
            res.status(404)
            return res.status(404).json({ message: "employee not found" })
        }
        res.status(200).json({ employee })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid employee ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// update employee
const updateEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findById(id)
        if (!employee) {
            res.status(404)
            return res.status(404).json({ message: "employee not found" })
        }
        employee.name = req.body.name || employee.name
        employee.role = req.body.role || employee.role
        employee.address = req.body.address || employee.address
        employee.phone = req.body.phone || employee.phone
        const updateEmployee = await employee.save();
        res.status(200).json({
            id: updateEmployee._id,
            name: updateEmployee.name,
            role: updateEmployee.role,
            address: updateEmployee.address,
            phone: updateEmployee.phone

        })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid employee ID" })
        }
        res.status(500).json({ message: error.message })
    }
}

// delete employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params
    try {
        const employee = await Employee.findByIdAndDelete(id)
        if (!employee) {
            return res.status(404).json({ message: "employee not found" })
        }
        res.status(200).json({ message: "employee deleted successfully" })
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid employee ID" })
        }
        res.status(500).json({ message: error.message })
    }
}
export { addEmployee, deleteEmployee, getEmployees, getSingleEmployee, updateEmployee };
