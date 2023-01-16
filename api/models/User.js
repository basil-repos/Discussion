import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
    status: {
        type: Number
    }
}, {timestamps: true}
);

export default mongoose.model('User', UserSchema);