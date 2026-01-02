import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, {id: true, timestamps: true})

export default mongoose.models.Link || mongoose.model('Link', LinkSchema)