const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Links directly to the Product model
    required: true 
  },
  quantity: { type: Number, required: true, min: 1, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', // Links directly to the User model
      required: true 
    },
    items: [cartItemSchema],
    totalPrice: { type: Number, required: true, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);