import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

type OrderItem = {
  product: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  items: OrderItem[];
  TotalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
};

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (!user) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/getOrders?userId=${user._id}`
        );
        setOrders(res.data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF4E8] px-4 sm:px-6 lg:px-12 py-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Orders 📦
          </h1>

          <Link
            to="/home"
            className="text-orange-600 font-semibold text-sm hover:underline"
          >
            ← Back to Shop
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">Loading orders...</p>
        )}

        {/* No Orders */}
        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <p className="text-gray-600 mb-4">
              You haven’t placed any orders yet 🍰
            </p>
            <Link
              to="/home"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                <p className="text-sm text-gray-500">
                  Order Date:{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-3">

               
                <span className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${order.orderStatus === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full
                  ${order.orderStatus === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {order.paymentStatus}
                </span>
                 </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm border-b pb-2"
                  >
                    <span>
                      {item.product} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>₹{order.TotalAmount}</span>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Payment: {order.paymentStatus}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
