import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type CartItem = {
  _id: string;
  product: string;
  price: number;
  quantity: number;
};

type CartType = {
  items: CartItem[];
  totalAmount: number;
};

const Cart = () => {
  const [cart, setCart] = useState<CartType | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (storedUser) setUser(user);
      if (!user) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/getCart?userId=${user._id}`
        );
        setCart(response.data.cart);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  const increaseQty = async (itemId: string) => {
    if (!cart) return;

    const response = await axios.post(
      "http://localhost:3000/editCart",
      { user, itemId, action: "increase" }
    );

    setCart(response.data.cart);
  };

  const decreaseQty = async (itemId: string) => {
    if (!cart) return;

    const response = await axios.post(
      "http://localhost:3000/editCart",
      { user, itemId, action: "decrease" }
    );

    setCart(response.data.cart);
  };

  return (
    <div className="bg-[#FFF4E8] px-3 sm:px-6 lg:px-10 py-6 min-h-screen">
      <div className="max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Your Cart 🛒
          </h1>

          <Link
            to="/home"
            className="text-orange-600 font-semibold text-sm hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Cart Card */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">

          {/* Empty Cart */}
          {!cart || cart.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                Your cart is currently empty 🍰
              </p>
              <Link
                to="/home"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
              >
                Add Items
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="
                      flex flex-col sm:flex-row
                      sm:justify-between sm:items-center
                      border-b pb-4 gap-3
                    "
                  >
                    {/* Product Info */}
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {item.product}
                      </h3>
                      <p className="text-orange-600 font-bold text-sm sm:text-base">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => decreaseQty(item._id)}
                        className="w-8 h-8 rounded-full border text-lg font-bold hover:bg-orange-100"
                      >
                        −
                      </button>

                      <span className="font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQty(item._id)}
                        className="w-8 h-8 rounded-full border text-lg font-bold hover:bg-orange-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="
                mt-6 pt-4 border-t
                flex flex-col sm:flex-row
                sm:justify-between sm:items-center
                gap-4
              ">
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  Total: ₹{cart.totalAmount}
                </p>

                <Link
                  to="/checkout"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition text-center"
                >
                  Checkout
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
