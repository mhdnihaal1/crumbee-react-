import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiPackage } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const categories = ["All", "Cakes", "Brownies"];

const productsData = [
  { no: 1, name: "Plum Brownie Cake", price: 99, image: "/black forest.jpg", types: "Cakes" },
  { no: 2, name: "Opera Cake", price: 129, image: "/chocolate brownie cake.jpg", types: "Cakes" },
  { no: 3, name: "Classic Fudge Brownie", price: 79, image: "/chocolate cake.jpg", types: "Brownies" },
  { no: 4, name: "Black Forest Cake", price: 129, image: "/chocolate moist cake.jpg", types: "Cakes" },
  { no: 5, name: "Walnut Brownie", price: 89, image: "/divine chocolate cake.jpg", types: "Brownies" },
  { no: 6, name: "Blueberry Cheesecake", price: 149, image: "/red velvet cake.jpg", types: "Cakes" },
  { no: 7, name: "Strawberry Brownie", price: 149, image: "/strawberry brownie cake.jpg", types: "Brownies" },
  { no: 8, name: "Strawberry Cake", price: 149, image: "/strawberry cake.jpg", types: "Cakes" },
  { no: 9, name: "White Forest Cake", price: 149, image: "/white forest cake.jpg", types: "Cakes" },
  { no: 10, name: "Fudge Cake", price: 149, image: "/fudge cake.jpg", types: "Cakes" },
];

const App = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const category = (val: string) => {
    setSelectedCategory(val);
    if (val === "All") {
      setProducts(productsData);
    } else {
      setProducts(productsData.filter((p) => p.types === val));
    }
  };

  const sort = (val: "low" | "high") => {
    const sorted = [...products].sort((a, b) =>
      val === "low" ? a.price - b.price : b.price - a.price
    );
    setProducts(sorted);
  };

  const addCart = async (productId: number, productName: string, productPrice: number) => {
 const storedUser = localStorage.getItem("user");
 console.log(storedUser)
    if (!storedUser) {
      return alert("Please login to add items to cart!"); 
    }
     await axios.post("http://localhost:3000/addCart", {
      user,
      productId,
      product: productName,
      price: productPrice,
    });
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-[#FFF4E8] px-4 sm:px-6 lg:px-12 py-6">
      <div className="w-full max-w-7xl mx-auto">

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-6">
          
          {/* Logo */}
          <svg
            width="200"
            height="60"
            viewBox="0 0 220 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" y="28" width="36" height="22" rx="4" fill="#F4C16D" />
            <path d="M10 28 C14 10, 42 10, 46 28 Z" fill="#F7A7C1" />
            <circle cx="28" cy="14" r="4" fill="#E94E77" />
            <text
              x="60"
              y="45"
              fontSize="36"
              fontFamily="cursive"
              fill="#6B2E1A"
              fontWeight="bold"
            >
              Crumbee
            </text>
          </svg>

          {/* Orders */}
          <Link
            to="/orders"
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
          >
            <FiPackage className="text-2xl" />
            <span className="hidden sm:block font-semibold text-lg">
              Orders
            </span>
          </Link>

        </div>

        {/* ===== CATEGORY ===== */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => category(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white border hover:bg-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ===== SORT ===== */}
        <div className="flex justify-center sm:justify-end mb-6">
          <select
            className="rounded-xl px-4 py-2 bg-white shadow border text-sm"
            onChange={(e) => sort(e.target.value as "low" | "high")}
          >
            <option>Select price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {/* ===== PRODUCTS ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.no}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-orange-600 font-bold">₹{product.price}</p>
                  <button
                    onClick={() =>
                      addCart(product.no, product.name, product.price)
                    }
                    className="px-3 py-1 border border-orange-500 text-orange-600 rounded-full text-xs hover:bg-orange-500 hover:text-white transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
