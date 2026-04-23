import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, ShoppingBag, Loader2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import API from '../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'USA'
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.food.price, 0);
  const total = subtotal + 5.00;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setLoading(true);
    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.food.name,
          qty: item.qty,
          image: item.food.image,
          price: item.food.price,
          food: item.food._id
        })),
        shippingAddress: address,
        paymentMethod: 'Credit Card',
        totalPrice: total
      };

      await API.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 pb-24">
      <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-3">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-100 p-3 rounded-2xl"><MapPin className="text-primary w-6 h-6" /></div>
            <h2 className="text-2xl font-bold">Shipping Details</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-2">Street Address</label>
              <input 
                required
                type="text" 
                placeholder="123 Food Street" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
                value={address.address}
                onChange={(e) => setAddress({...address, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-2">City</label>
                <input 
                  required
                  type="text" 
                  placeholder="New York" 
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={address.city}
                  onChange={(e) => setAddress({...address, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 ml-2">Postal Code</label>
                <input 
                  required
                  type="text" 
                  placeholder="10001" 
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:ring-2 focus:ring-primary outline-none transition-all"
                  value={address.postalCode}
                  onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center gap-3 mt-10 mb-6">
              <div className="bg-orange-100 p-3 rounded-2xl"><CreditCard className="text-primary w-6 h-6" /></div>
              <h2 className="text-2xl font-bold">Payment Method</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border-2 border-primary flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-[10px] text-white font-bold">VISA</div>
                <span className="font-bold text-gray-700">Credit Card</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || cartItems.length === 0}
              className="w-full mt-10 hero-gradient text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-orange-100 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Pay ${total.toFixed(2)} & Place Order</>}
            </button>
          </form>
        </motion.div>

        {/* Order Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-8">Order Preview</h2>
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2 no-scrollbar">
              {cartItems.map(item => (
                <div key={item.food._id} className="flex items-center gap-4">
                  <img src={item.food.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{item.food.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-bold">${(item.food.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="h-px bg-gray-100 my-8"></div>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold text-gray-900 pt-4">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
