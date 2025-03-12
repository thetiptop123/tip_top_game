const express = require("express");
const router = express.Router();

const { 
    getUserProfileController,
     updateProfileController,
     resetPasswordController, 
     updatePasswordController,
     getAllUsersController,
     getAllClientsController,
     getAllEmployersController,
     updateUserController,
     logoutUserController,
    } = require("../controllers/userController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userTypeMiddleware } = require("../middlewares/userTypeMiddleware");


router.get('/userprofile', authMiddleware, getUserProfileController); // get my data

// update user data
router.put('/updateprofile', authMiddleware, updateProfileController);    // update my data 

//Reset password 
router.post('/resetpassword', authMiddleware, resetPasswordController);

// password update
router.put('/updatepassword', authMiddleware, updatePasswordController);


//get all users
router.get('/allusers', authMiddleware, userTypeMiddleware("admin"), getAllUsersController);
router.get('/allclients', authMiddleware, userTypeMiddleware("admin","employer"), getAllClientsController);
router.get('/allemployers', authMiddleware, userTypeMiddleware("admin"), getAllEmployersController);

//update user
router.put('/updateuser/:id', authMiddleware, userTypeMiddleware("admin","employer"), updateUserController);


//logout user
router.post('/logoutuser/:id', authMiddleware,userTypeMiddleware("admin","employer"), logoutUserController);




module.exports = router;
 