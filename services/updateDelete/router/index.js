const userController = require('../controllers/userController');

const router = require('express').Router();

router.delete("/accountNumber/:accountNumber", userController.delUser);
router.put("/accountNumber/:accountNumber", userController.editUser);

module.exports = router;