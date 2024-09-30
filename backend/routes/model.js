import mongoose from "mongoose";

// Define the schema for an element
const elementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },

    elements: {
        type: [elementSchema], // Array of elements specific to each user
        default: [
            { name: "Water", emoji: "🌊" },
            { name: "Earth", emoji: "🌍" },
            { name: "Wind", emoji: "🌬️" },
            { name: "Fire", emoji: "🔥" },
        ],
    },
});

const User = mongoose.model("User", userSchema);

export default User;
