const express = require('express');
const router = express.Router()
const { registerUser ,authUser ,allUsers } = require("../controllers/userControllers");
const { protect } = require('../middlewares/auth');

router.route('/signup').post(registerUser);
router.route('/login').post(authUser);
router.get('/' ,protect, allUsers);

module.exports = router;