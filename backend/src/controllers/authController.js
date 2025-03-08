const userModel = require("../models/usersModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Register a new user
const registerUserController = async (req, res) => {
    try {
        const { userName, email, password, phone, address,answer } = req.body;
        // check if all fields are provided
        if(!userName || !email || !password  || !address || !phone || !answer) {    
            return res.status(500).json({
                success: false,
                message: 'all fields are required',
            });
        }
        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if(existingUser) {
            return res.status(500).json({
                success: false,
                message: 'email already exists please login',
            });
        }
        // hash password
        var salt =  bcrypt.genSaltSync(10);
        const  hashedPassword = await bcrypt.hash(password, salt);
        // create user                                      
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
            answer,
        });
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            user,
        });
    } catch (error) {
        res.status(500).json({
             message: 'error in register controller',
             error,
            });
    }
   
};

module.exports = { registerUserController };
