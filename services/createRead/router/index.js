const userController = require('../controllers/userController');

const router = require('express').Router();

router.get('/',userController.findAllUsers);
router.post('/',userController.postUser);
router.get("/accountNumber/:accountNumber", userController.findAccountNumber);
router.get("/identityNumber/:identityNumber", userController.findIdNumber);

module.exports = router;