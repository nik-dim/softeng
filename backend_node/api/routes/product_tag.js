const express = require('express');
const router = express.Router();
const ProductTagsController = require('../controllers/product_tags');
const checkAuth = require('../middleware/check-auth');
const authorize = require('../middleware/authorize');
const checkBlacklist = require('../middleware/checkBlacklist');


router.get('/', ProductTagsController.productTags_get_all);

router.post('/', ProductTagsController.productTags_post);

router.get('/:id', ProductTagsController.productTags_get);

// router.put('/:id', /*checkAuth, authorize('User'), */ ProductsController.products_put_product);

// router.patch('/:id', /*checkAuth, authorize('User'), */ ProductsController.products_patch_product);

// router.delete('/:id', checkAuth, authorize('User'), ProductsController.products_delete_product);


module.exports = router;