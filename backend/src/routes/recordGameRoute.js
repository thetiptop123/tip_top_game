const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userTypeMiddleware } = require("../middlewares/userTypeMiddleware");
const { recordGameController } = require("../controllers/gameController");


//register user
router.post('/jeux', authMiddleware,userTypeMiddleware("client"), recordGameController);



module.exports = router;