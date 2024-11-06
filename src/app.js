import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from '../config/db.js'
import cashPaymentRoutes from '../routes/cashPaymentRoutes.js'
import creditRoutes from '../routes/creditRoutes.js'
import customerRoutes from '../routes/customerRoutes.js'
import dealerRoutes from '../routes/dealerRoutes.js'
import employeeRoutes from '../routes/employeeRoutes.js'
import profitRoutes from '../routes/expenseRoutes.js'
import expenseRoutes from '../routes/profitRoutes.js'
import shopRoutes from '../routes/shopRoutes.js'

dotenv.config()
console.log(process.env.MONGO_URI);
connectDB()

const PORT = process.env.PORT || 3000

const app = express()

// middleware
app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))
app.use("/api", shopRoutes)
app.use("/api", employeeRoutes)
app.use("/api", customerRoutes)
app.use("/api", creditRoutes)
app.use("/api", expenseRoutes)
app.use("/api", profitRoutes)
app.use("/api", dealerRoutes)
app.use("/api", cashPaymentRoutes)


app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>")
})

app.listen(PORT, () => console.log(`server started on port ${PORT}`))