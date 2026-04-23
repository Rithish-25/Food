import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const FoodCard = ({ food }) => {
  const { addToCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!userInfo) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    addToCart(food);
    toast.success(`${food.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={food.image} 
          alt={food.name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold">4.5</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{food.name}</h3>
          <span className="text-primary font-bold text-xl">${food.price}</span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">
          {food.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
            {food.category}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="bg-primary text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-md shadow-red-200"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
