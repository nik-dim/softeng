const express = require('express');
const router = express.Router();
const ShopsController = require('../controllers/shop');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');

router.get('/', ShopsController.shops_get_all);

router.post('/', /*checkBlacklist, checkAuth, authorize('Admin'),*/ ShopsController.shops_create_shop);

router.get('/:id', ShopsController.shops_get_shop);

router.put('/:id', checkBlacklist, checkAuth, authorize('User', 'Admin'), ShopsController.shops_put_shop);

router.patch('/:id', checkBlacklist, checkAuth, authorize('User', 'Admin'), ShopsController.shops_patch_shop);

router.delete('/:id', checkBlacklist, checkAuth, authorize('User', 'Admin'), ShopsController.shops_delete_shop);


module.exports = router;