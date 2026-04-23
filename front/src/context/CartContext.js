import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import API from '../utils/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [userInfo]);

  const fetchCart = async () => {
    try {
      const { data } = await API.get('/cart');
      // Backend returns cart object with cartItems array
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error('Error fetching cart', error);
    }
  };

  const addToCart = async (food, qty = 1) => {
    if (!userInfo) return;
    try {
      await API.post('/cart/add', { foodId: food._id, qty });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      await API.delete(`/cart/remove/${foodId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart', error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
