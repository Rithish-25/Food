import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu as MenuIcon } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { userInfo, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass-morphism sticky top-0 z-50 px-6 py-4 flex justify-between items-center shadow-sm">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-3xl transform group-hover:rotate-12 transition-transform">🍕</span>
        <span className="text-2xl font-black gradient-text tracking-tight">
          FoodieHub
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8 font-medium">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
        <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
      </div>

      <div className="flex items-center gap-5">
        <Link to="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 group-hover:text-primary transition-colors" />
          {cartItems.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
            >
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </motion.span>
          )}
        </Link>

        {userInfo ? (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-semibold">{userInfo.name}</span>
              <span className="text-xs text-gray-500">{userInfo.isAdmin ? 'Admin' : 'Member'}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-red-600 transition-all shadow-md"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
