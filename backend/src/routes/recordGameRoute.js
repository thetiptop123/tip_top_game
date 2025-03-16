const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { userTypeMiddleware } = require("../middlewares/userTypeMiddleware");
const { recordGameController , launchGameController} = require("../controllers/gameController");


//register user
router.post('/jeux', authMiddleware,userTypeMiddleware("client"), recordGameController);


//lunch game
router.post('/launchgame', authMiddleware,userTypeMiddleware("admin"), launchGameController);



module.exports = router;