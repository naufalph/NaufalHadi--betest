const { authenticate } = require('../auth/auth');
const userController = require('../controllers/userController');

const router = require('express').Router();

router.post("/login", userController.loginUser);
router.use(authenticate);
router.delete("/accountNumber/:accountNumber", userController.delUser);
router.put("/accountNumber/:accountNumber", userController.editUser);
module.exports = router;