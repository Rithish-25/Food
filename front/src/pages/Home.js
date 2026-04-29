import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, Utensils, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import FoodCard from '../components/FoodCard';

const Home = () => {
  const [featuredFoods, setFeaturedFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await API.get('/foods');
        setFeaturedFoods(data.slice(0, 3));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-left"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
              #1 Food Delivery Service
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              Delicious Food <br />
              <span className="gradient-text">Delivered to You</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg">
              Experience the best flavor from top chefs. Fresh ingredients, fast delivery, and an unforgettable taste experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="hero-gradient text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-orange-200 hover:scale-105 transition-transform">
                Order Now <ChevronRight className="w-5 h-5" />
              </Link>
              <Link to="/menu" className="bg-white border-2 border-gray-100 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors">
                View Menu
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 relative"
          >
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80" 
                alt="Delicious Food" 
                className="rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            {/* Floating UI elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-10 right-4 glass-morphism p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="bg-green-100 p-2 rounded-full"><Clock className="w-6 h-6 text-green-600" /></div>
              <div>
                <p className="font-bold text-sm">Fast Delivery</p>
                <p className="text-xs text-gray-500">Under 30 mins</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50 -z-0 rounded-l-[10rem]" />
      </section>

      {/* Featured Section */}
      <section className="px-6 container mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Special Dishes</h2>
            <p className="text-gray-500">Hand-picked favorites by our community</p>
          </div>
          <Link to="/menu" className="text-primary font-bold flex items-center gap-1 group">
            See All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="h-80 skeleton rounded-3xl" />
            ))
          ) : (
            featuredFoods.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))
          )}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-10 bg-dark text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-white/10 p-5 rounded-3xl"><Utensils className="w-8 h-8 text-secondary" /></div>
            <h3 className="text-xl font-bold">Premium Quality</h3>
            <p className="text-gray-400">We use only the freshest ingredients sourced from local organic farms.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-white/10 p-5 rounded-3xl"><Truck className="w-8 h-8 text-secondary" /></div>
            <h3 className="text-xl font-bold">Safe Delivery</h3>
            <p className="text-gray-400">Our delivery partners follow all safety protocols for a contactless experience.</p>
          </div>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="bg-white/10 p-5 rounded-3xl"><Clock className="w-8 h-8 text-secondary" /></div>
            <h3 className="text-xl font-bold">24/7 Support</h3>
            <p className="text-gray-400">Our customer care is always here to help you with your cravings.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
