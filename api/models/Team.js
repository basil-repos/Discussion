import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    cover_photo: {
        type: String,
        required: true
    },
    publish: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true}
);

export default mongoose.model('Team', TeamSchema);