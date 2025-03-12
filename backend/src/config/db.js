const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log(error, "error connecting to database");
    }
}

module.exports = connectDB;


