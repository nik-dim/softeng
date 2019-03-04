const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.post("/logout", UserController.user_logout);

router.delete("/:userId", checkBlacklist, checkAuth, authorize('Admin'), UserController.user_delete);

router.get('/', checkBlacklist, checkAuth, authorize('Admin'), UserController.users_get_all);


router.get('/users/:id', UserController.users_get_user);


router.patch('/', checkBlacklist, checkAuth, authorize('Admin'), UserController.user_update_to_Admin);

router.get('/users/prices/:id', /* checkBlacklist, checkAuth, authorize(['Admin', 'User']),*/ UserController.prices_get_all_by_user);


module.exports = router;