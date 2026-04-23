import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.food.price, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-6 py-12 pb-24">
      <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-3">
        <ShoppingBag className="w-10 h-10 text-primary" /> Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="bg-white p-12 rounded-[2.5rem] text-center border border-gray-100 shadow-sm">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/menu" className="hero-gradient text-white px-8 py-4 rounded-2xl font-bold inline-block">
                Go to Menu
              </Link>
            </div>
          ) : (
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.food._id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white p-6 rounded-3xl flex flex-col sm:flex-row items-center gap-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <img 
                    src={item.food.image} 
                    alt={item.food.name} 
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-lg mb-1">{item.food.name}</h3>
                    <p className="text-primary font-bold text-lg">${item.food.price}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-2xl">
                    <button 
                      onClick={() => addToCart(item.food, Math.max(1, item.qty - 1))}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="font-bold w-8 text-center">{item.qty}</span>
                    <button 
                      onClick={() => addToCart(item.food, item.qty + 1)}
                      className="p-1 hover:text-primary transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.food._id)}
                    className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-gray-800">${shipping.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-100 my-4"></div>
              <div className="flex justify-between text-xl font-extrabold">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              disabled={cartItems.length === 0}
              className="w-full hero-gradient text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              Checkout <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center mt-6 text-xs text-gray-400">
              Tax will be calculated at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
