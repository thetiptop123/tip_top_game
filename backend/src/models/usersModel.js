const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        sparse: true

    },
    googleId: {
        type: String,
        default: null,
    },
    facebookId: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        // trim: true,
        // minlength: [3, 'password must be at least 3 characters'],
        // maxlength: [20, 'password must be less than 20 characters']
    },
    phone: {
        type: String,
        required: [true, 'phoneNumber is required'],
        default: "06 06 06 06 06"
    },
    address: {
        type: Array,
        default: ["Vincennes","Paris"],
    },
    userType: {
        type: String,
        required: [true, 'userType is required'],
        default: 'client',
        enum: ['admin', 'client', 'vendor'],
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png',
    },
    answer: {
        type: String,
        required: [true, 'Answer is require'],
        default: "test"
    }


}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;