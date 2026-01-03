import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const Checkout = () => {
    const navigate = useNavigate();
    
  const [cart, setCart] = useState<CartType | null>(null);
  const [discount, setDiscount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
       const storedUser = localStorage.getItem("user");
         const user = storedUser ? JSON.parse(storedUser) : null 
     if (storedUser) {
      setUser(user);
    }

      const response = await axios.get(
        `http://localhost:3000/getCart?userId=${user._id}`
      );

      const cartData = response.data.cart;
      setCart(cartData);

      if (cartData.totalAmount > 500) {
        setDiscount(cartData.totalAmount * 0.1);
      }
    };

    fetchCart();
  }, []);

  const finalAmount = cart ? cart.totalAmount - discount : 0;
    const PlaceOrder = async () => {
         const obj = {
      user: user ,
      discountApplied: finalAmount > 500 ? true : false,  
      TotalAmount: finalAmount 
     };

        const response = await axios.post(
      "http://localhost:3000/addOrder",
       obj
    );
    console.log("Add to Cart Response:", response.data);
     if(response){
      navigate("/home"); 
    }
    };

  return (
    <div className="bg-[#FFF4E8] px-3 sm:px-6 py-6 sm:py-10">
      
      {/* Responsive Card */}
      <div className="
        w-full
        max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl
        mx-auto
        bg-white
        rounded-2xl
        shadow-lg
        p-5 sm:p-6 md:p-8
      ">
        
        <h1 className="
          text-xl sm:text-2xl
          font-bold
          text-gray-800
          mb-4 sm:mb-6
          text-center
        ">
          Checkout 🧾
        </h1>

        <h2 className="
          text-lg sm:text-xl
          font-semibold
          mb-4 sm:mb-5
        ">
          Order Summary
        </h2>

        {cart?.items.map((item) => (
          <div
            key={item._id}
            className="
              flex justify-between items-center
              border-b
              py-2 sm:py-3
            "
          >
            <div>
              <p className="font-medium text-sm sm:text-base">
                {item.product}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>

            <p className="font-semibold text-sm sm:text-base">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}

        <div className="mt-5 space-y-2 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{cart?.totalAmount}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%)</span>
              <span>- ₹{discount}</span>
            </div>
          )}

          <div className="
            flex justify-between
            font-bold
            text-base sm:text-lg
            border-t pt-3
          ">
            <span>Total Payable</span>
            <span>₹{finalAmount}</span>
          </div>
        </div>

        {cart && cart.totalAmount > 500 && (
          <p className="text-green-600 text-xs sm:text-sm mt-3">
            🎉 You saved 10% on orders above ₹500!
          </p>
        )}

        <button
          type="button"
          onClick={ PlaceOrder}
          className="
            mt-5 sm:mt-6
            w-full
            bg-orange-500 hover:bg-orange-600
            text-white
            font-semibold
            py-2.5 sm:py-3
            rounded-xl
            transition
          "
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
