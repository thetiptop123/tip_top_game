const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { registerUserController} = require("../controllers/authController");


router.post('/register', registerUserController);

// router.post('/login', loginUserController); 

// router.post('/logout', authMiddleware, logoutController);

module.exports = router;