'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthContext';
import { useRouter } from 'next/navigation';

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
}

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      // Fetch order history
      fetch('/api/orders/history')
        .then(res => res.json())
        .then(data => setOrders(data.orders))
        .finally(() => setLoadingOrders(false));
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm mb-8">
        <h2 className="text-2xl font-bold mb-6 text-green-800">Profile</h2>
        <div className="mb-4">
          <span className="font-semibold">Name:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="font-semibold">Email:</span> {user.email}
        </div>
        <button
          onClick={logout}
          className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800 transition mt-4"
        >
          Logout
        </button>
      </div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
        <h3 className="text-xl font-bold mb-4 text-green-700">Order History</h3>
        {loadingOrders ? (
          <div>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <ul className="space-y-6">
            {orders.map(order => (
              <li key={order.id} className="border-b pb-4">
                <div className="font-semibold">Order #{order.id} <span className="text-xs text-gray-500">({order.status})</span></div>
                <div className="text-sm text-gray-600 mb-2">Date: {order.date}</div>
                <div className="font-bold">Total: ${order.total.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 