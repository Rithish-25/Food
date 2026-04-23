import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await API.get('/orders/myorders');
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 pb-24">
      <h1 className="text-4xl font-extrabold mb-10 flex items-center gap-3">
        <Package className="w-10 h-10 text-primary" /> My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-[2.5rem] text-center border border-gray-100 shadow-sm">
          <div className="text-6xl mb-6">📦</div>
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p className="text-gray-500">When you place orders, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={order._id}
              className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-6 border-b border-gray-50">
                <div className="flex flex-wrap gap-8">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                    <p className="font-mono text-sm font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
                    <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total</p>
                    <p className="text-sm font-extrabold text-primary">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Status</p>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" /> {order.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{order.shippingAddress.city}, {order.shippingAddress.address}</span>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-gray-50/50">
                <div className="flex overflow-x-auto gap-6 pb-2 no-scrollbar">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="flex-shrink-0 flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
                      <img src={item.image} className="w-12 h-12 rounded-xl object-cover" alt="" />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
