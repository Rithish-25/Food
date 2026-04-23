const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.food');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ cartItems: [] });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { foodId, qty } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const existItem = cart.cartItems.find((x) => x.food.toString() === foodId);

    if (existItem) {
      existItem.qty = qty;
    } else {
      cart.cartItems.push({ food: foodId, qty });
    }
    await cart.save();
  } else {
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ food: foodId, qty }],
    });
  }

  res.status(201).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    cart.cartItems = cart.cartItems.filter(
      (x) => x.food.toString() !== req.params.id
    );
    await cart.save();
    res.json(cart);
  } else {
    res.status(404);
    throw new Error('Cart not found');
  }
});

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
};
