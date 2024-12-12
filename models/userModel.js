import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "manager", "user"]
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop' // Reference to the Shop model for the shop where the employee works
    },

},
    { timestamps: true }
)

const User = mongoose.model("User", userSchema)

export default User