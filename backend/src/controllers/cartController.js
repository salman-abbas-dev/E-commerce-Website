const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    // Create an empty cart automatically if the user doesn't have one yet
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addItemToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    // Check if the product is already in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If it exists, simply add to the existing quantity
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      // If it's a new item, push it to the array
      cart.items.push({ product: productId, quantity });
    }

    // Populate the product data so we have access to the exact price
    await cart.populate('items.product');
    
    // Calculate the new total price, ignoring any products that might have been deleted
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + ((item.product?.price || 0) * item.quantity);
    }, 0);
    
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
const updateItemQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Replace the old quantity entirely
      cart.items[itemIndex].quantity = Number(quantity);

      await cart.populate('items.product');
      cart.totalPrice = cart.items.reduce((total, item) => {
        return total + ((item.product?.price || 0) * item.quantity);
      }, 0);
      
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeItemFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Filter out the item matching the productId
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.populate('items.product');
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + ((item.product?.price || 0) * item.quantity);
    }, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
};