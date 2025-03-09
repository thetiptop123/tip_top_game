const express = require("express");
const router = express.Router();
const { 
    getUserProfileController,
     updateProfileController,
     resetPasswordController, 
     updatePasswordController,
    } = require("../controllers/userController"); 
const { authMiddleware } = require("../middlewares/authMiddleware");



router.get('/userprofile', authMiddleware, getUserProfileController); // get my data

// update user data
router.put('/updateprofile', authMiddleware, updateProfileController);    // update my data 

//Reset password 
router.post('/resetpassword', authMiddleware, resetPasswordController);

// password update
router.put('/updatepassword', authMiddleware, updatePasswordController);



//logout user




module.exports = router;
 