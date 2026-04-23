import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import FoodCard from '../components/FoodCard';
import { Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Pizza', 'Burger', 'Sushi', 'Salad', 'Pasta', 'Dessert'];

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await API.get('/foods');
        setFoods(data);
        setFilteredFoods(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  useEffect(() => {
    let result = foods;
    if (category !== 'All') {
      result = result.filter(f => f.category === category);
    }
    if (searchTerm) {
      result = result.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredFoods(result);
  }, [category, searchTerm, foods]);

  return (
    <div className="container mx-auto px-6 py-12 pb-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Our Full Menu</h1>
        <p className="text-gray-500 max-w-lg mx-auto">Explore our diverse range of delicious dishes, carefully prepared to satisfy your taste buds.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search for food..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                category === cat 
                ? 'hero-gradient text-white shadow-lg' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Food Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1,2,3,4,5,6,7,8].map(i => (
            <div key={i} className="h-80 skeleton rounded-3xl" />
          ))}
        </div>
      ) : filteredFoods.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredFoods.map(food => (
            <FoodCard key={food._id} food={food} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-700">No items found matching your criteria</h2>
          <button 
            onClick={() => {setCategory('All'); setSearchTerm('')}}
            className="mt-4 text-primary font-bold underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
