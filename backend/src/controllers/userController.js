const userModel = require("../models/usersModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//const { authMiddleware } = require("../middlewares/authMiddleware");

const getUserProfileController =  async (req, res) => {
   try {
    const user = req.user;
    
    if(!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found',
        });
    }
    res.status(200).json({
        success: true,
        message: 'User get successfully',
        user
    });
   } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error
    });
   }
};

const updateProfileController = async (req, res) => {
    try {
        // Extract user ID from req.user
        const userId = req.user._id;
        
        // Filter request body to prevent updating protected fields
        const allowedUpdates = ['userName', 'email', 'phone', 'address','profile']; 

        const { userName, email } = req.body;

     //verify is all fields are not empty
        if(!userName || !email ) {    
            return res.status(500).json({
                success: false,
                message: 'all fields are required',
            });
        }
        // Add fields you allow updating
        const updates = Object.keys(req.body)
            .filter(key => allowedUpdates.includes(key))
            .reduce((obj, key) => {
                obj[key] = req.body[key];
                return obj;
            }, {});

             // Check if the email is being changed and if it is, check if it is already in use by another user
        if (updates.email) {
            const existingUser = await userModel.findOne({ email: updates.email });
            if (existingUser && existingUser._id.toString() !== userId.toString()) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already in use by another user',
                });
            }
        }

        // Update user profile
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};


const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer, confirmPassword} = req.body   
        if (!email || !answer ||!newPassword || !confirmPassword ) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //check user
        const user = await userModel.findOne({email, answer});
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or answer',
            });
        }
        //compare password
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword do not match',
            });
        }
        //hash password
        var salt =  bcrypt.genSaltSync(10);
        const  hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //save user
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await userModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not found',
            });
        }

        // Vérifier l'ancien mot de passe
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid old password',
            });
        }

        // Vérifier si le nouveau mot de passe est identique à l'ancien
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: 'New password cannot be the same as the old password',
            });
        }

        // Vérifier que les deux nouveaux mots de passe correspondent
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword do not match',
            });
        }

        // Hasher le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Enregistrer les modifications
        await user.save();

        // Générer un nouveau token (optionnel)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            success: true,
            message: 'Password updated successfully. Please log in again.',
            token,  // Retourner le nouveau token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};



module.exports = { 
    getUserProfileController,
    updateProfileController,
    resetPasswordController,
    updatePasswordController
};     