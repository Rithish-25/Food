const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Food = require('./models/foodModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    isAdmin: true,
  },
  {
    name: 'Rithish',
    email: 'rithish@example.com',
    password: 'password123',
    isAdmin: false,
  },
];

const foods = [
  {
    name: 'Gourmet Cheese Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    description: 'Crispy crust with premium mozzarella, fresh basil, and signature tomato sauce.',
    category: 'Pizza',
    price: 12.99,
  },
  {
    name: 'Classic Beef Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Juicy beef patty with cheddar cheese, lettuce, tomato, and special burger sauce.',
    category: 'Burger',
    price: 8.49,
  },
  {
    name: 'Spicy Sushi Platter',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    description: 'A variety of fresh tuna, salmon, and avocado rolls with a hint of wasabi.',
    category: 'Sushi',
    price: 18.99,
  },
  {
    name: 'Fresh Garden Salad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Mix of seasonal greens, cherry tomatoes, cucumbers, and balsamic vinaigrette.',
    category: 'Salad',
    price: 7.99,
  },
  {
    name: 'Creamy Pasta Carbonara',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    description: 'Authentic Italian pasta with pancetta, egg yolk, and parmesan cheese.',
    category: 'Pasta',
    price: 14.50,
  },
  {
    name: 'Chocolate Lava Cake',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Chocolate_Lava_Cake.jpg/800px-Chocolate_Lava_Cake.jpg',
    description: 'Warm chocolate cake with a molten center, served with vanilla ice cream.',
    category: 'Dessert',
    price: 6.99,
  }
];

const importData = async () => {
  try {
    await User.deleteMany();
    await Food.deleteMany();

    // Use create instead of insertMany to trigger the pre-save password hashing hook
    for (const user of users) {
      await User.create(user);
    }
    
    await Food.insertMany(foods);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
