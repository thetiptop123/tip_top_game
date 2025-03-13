const userModel = require("../models/usersModel");
const gainModel = require("../models/gainsModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//const { authMiddleware } = require("../middlewares/authMiddleware");

const getUserProfileController = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
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
        const allowedUpdates = ['userName', 'email', 'phone', 'address', 'profile'];

        const { userName, email } = req.body;

        //verify is all fields are not empty
        if (!userName || !email) {
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


const seeMyGainsController = async (req, res) => {
    try {
        const user = req.user;
        const gains = await gainModel.find({ userId: user._id });
        if (gains.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No gains found',
            });
        }
        res.status(200).json({  
            success: true,
            message: 'Gains fetched successfully',
            gains,
            nombreGains: gains.length
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
        const { email, newPassword, answer, confirmPassword } = req.body
        if (!email || !answer || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //check user
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Invalid email or answer',
            });
        }
        //compare password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and confirmPassword do not match',
            });
        }
        //hash password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //save user
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({
            success: true,
            message: 'Password reset successfully',
            token,
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


const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find();

        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            users,
            nombreUsers: users.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


const getAllClientsController = async (req, res) => {
    try {
        const clients = await userModel.find({ userType: 'client' });

        if (clients.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No clients found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Clients fetched successfully',
            clients,
            nombreClients: clients.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


const getAllEmployersController = async (req, res) => {
    try {
        const employers = await userModel.find({ userType: 'employer' });
        if (employers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No employees found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'All employees fetched successfully',
            employers,
            nombreEmployers: employers.length

        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};


const updateUserController = async (req, res) => {
    try {
        // Récupérer l'utilisateur connecté (via le token)
        const loggedInUser = req.user; // Vient du middleware d'authentification
        const { userName, email, password, phone, address, profile, userType } = req.body;

        // Récupérer l'utilisateur à modifier
        const userToUpdate = await userModel.findById(req.params.id);
        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // 🔹 Règle 1 : Un client ne peut modifier personne
        if (loggedInUser.userType === 'client') {
            return res.status(403).json({
                success: false,
                message: "Access denied. Clients cannot modify user data.",
            });
        }

        // 🔹 Règle 2 : Un employer peut modifier un client mais PAS son `userType`
        if (loggedInUser.userType === 'employer') {
            if (userToUpdate.userType !== 'client') {
                return res.status(403).json({
                    success: false,
                    message: "You are not authorized to modify user type .",
                });
            }
        }

        // 🔹 Règle 3 : Un employer ne peut PAS modifier le `userType` d’un client
        const updates = {};
        if (userName) updates.userName = userName;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (address) updates.address = address;
        if (profile) updates.profile = profile;

        // 🔹 Règle 4 : Vérifier si l’email est déjà utilisé par un autre utilisateur
        if (email) {
            const existingUser = await userModel.findOne({ email });
            if (existingUser && existingUser._id.toString() !== userToUpdate._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already in use by another user',
                });
            }
        }

        // 🔹 Règle 5 : Vérifier si le mot de passe doit être mis à jour
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(password, salt);
        }

        // 🔹 Règle 6 : Si c'est un employé qui fait la modification, il ne peut pas changer `userType`
        if (loggedInUser.userType === 'employer' && userType) {
            return res.status(403).json({
                success: false,
                message: "Employers cannot change a client's userType.",
            });
        }

        // Uniquement un admin peut modifier le userType
        if (loggedInUser.userType === 'admin' && userType) {
            const validUserTypes = ['admin', 'client', 'employer'];
            if (!validUserTypes.includes(userType)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid userType. Allowed values: admin, client, employees',
                });
            }
            updates.userType = userType;
        }


        // 🔹 Effectuer la mise à jour
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, updates, { new: true });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
};
const logoutUserController = async (req, res) => {
    try {
        // Récupérer l'utilisateur connecté via le token JWT
        const loggedInUser = req.user; // Vient du middleware d'authentification

        // L'ID de l'utilisateur que l'on souhaite déconnecter (via le paramètre de la route)
        const userIdToLogout = req.params.id;

        // 🔹 Règle 1 : Vérifier que l'utilisateur connecté est autorisé à déconnecter
        // Un 'admin' peut déconnecter n'importe quel utilisateur, un 'employer' peut seulement déconnecter un 'client'
        if (loggedInUser.userType !== 'admin' && loggedInUser.userType !== 'employer') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to log out other users.',
            });
        }

        // 🔹 Règle 2 : Vérifier que l'utilisateur à déconnecter existe
        const userToLogout = await userModel.findById(userIdToLogout);
        if (!userToLogout) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // 🔹 Règle 3 : Si l'utilisateur est un 'employer', il peut seulement déconnecter des 'clients'
        if (loggedInUser.userType === 'employer' && userToLogout.userType !== 'client') {
            return res.status(403).json({
                success: false,
                message: 'Employees can only log out clients.',
            });
        }
        if (loggedInUser.userType === 'admin' || loggedInUser.userType === 'employer') {
           

            res.clearCookie('authToken'); // Suppression du cookie 'authToken' si tu utilises des cookies

          

            return res.status(200).json({
                success: true,
                message: 'User has been logged out successfully.',
            });
        }


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
    updatePasswordController,
    getAllUsersController,
    getAllEmployersController,
    getAllClientsController,
    seeMyGainsController,
    updateUserController,
    logoutUserController,
};     