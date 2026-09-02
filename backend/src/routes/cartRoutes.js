const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
} = require('../controllers/cartController');

// All routes are prefixed with /api/cart and protected
router.route('/')
  .get(protect, getCart);

router.route('/add')
  .post(protect, addItemToCart);

router.route('/update')
  .put(protect, updateItemQuantity);

router.route('/remove/:productId')
  .delete(protect, removeItemFromCart);

module.exports = router;