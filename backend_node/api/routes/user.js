const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/logout", UserController.user_logout);

router.delete("/:userId", checkAuth, UserController.user_delete);

router.get('/', UserController.users_get_all);

module.exports = router;