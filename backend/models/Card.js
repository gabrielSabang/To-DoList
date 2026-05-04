import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model("Card", cardSchema)