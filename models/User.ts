import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    }
}, {id: true, timestamps: true})



export default mongoose.models.User || mongoose.model('User', UserSchema)