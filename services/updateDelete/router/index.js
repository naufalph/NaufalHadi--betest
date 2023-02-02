const userController = require('../controllers/userController');

const router = require('express').Router();

// router.get('/',userController.findAllUsers);
// router.post('/',userController.postUser);
// router.get("/accountNumber/:accountNumber", userController.findAccountNumber);
// router.get("/identityNumber/:identityNumber", userController.findIdNumber);

router.delete("/accountNumber/:accountNumber", userController.delUser);
router.put("/accountNumber/:accountNumber", userController.editUser);

module.exports = router;