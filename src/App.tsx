import React, { useState } from "react";

 

const categories = ["All", "Cakes", "Brownies"];
const products = [
  { name: "Plum Brownie Cake", price: 99, image: "/black forest.jpg", type: "Cakes" },
  { name: "Opera Cake", price: 129, image: "/chocolate brownie cake.jpg", type: "Cakes" },
  { name: "Classic Fudge Brownie", price: 79, image: "/chocolate cake.jpg", type: "Brownies" },
  { name: "Black Forest Cake", price: 129, image: "/chocolate moist cake.jpg", type: "Cakes" },
  { name: "Walnut Brownie", price: 89, image: "/divine chocolate cake.jpg", type: "Brownies" },
  { name: "Blueberry Cheesecake", price: 149, image: "/red velvet cake.jpg", type: "Cakes" },
  { name: "Strawberry Brownie", price: 149, image: "/strawberry brownie cake.jpg", type: "Brownies" },
  { name: "Strawberry Cake", price: 149, image: "/strawberry cake.jpg", type: "Cakes" },
  { name: "White Forest Cake", price: 149, image: "/white forest cake.jpg", type: "Cakes" },
  { name: "Fudge Cake", price: 149, image: "/fudge cake.jpg", type: "Cakes" },
]
const App = () => {
 const [product, setProducts] = useState([
  { name: "Plum Brownie Cake", price: 99, image: "/black forest.jpg", type: "Cakes" },
  { name: "Opera Cake", price: 129, image: "/chocolate brownie cake.jpg", type: "Cakes" },
  { name: "Classic Fudge Brownie", price: 79, image: "/chocolate cake.jpg", type: "Brownies" },
  { name: "Black Forest Cake", price: 129, image: "/chocolate moist cake.jpg", type: "Cakes" },
  { name: "Walnut Brownie", price: 89, image: "/divine chocolate cake.jpg", type: "Brownies" },
  { name: "Blueberry Cheesecake", price: 149, image: "/red velvet cake.jpg", type: "Cakes" },
  { name: "Strawberry Brownie", price: 149, image: "/strawberry brownie cake.jpg", type: "Brownies" },
  { name: "Strawberry Cake", price: 149, image: "/strawberry cake.jpg", type: "Cakes" },
  { name: "White Forest Cake", price: 149, image: "/white forest cake.jpg", type: "Cakes" },
  { name: "Fudge Cake", price: 149, image: "/fudge cake.jpg", type: "Cakes" },
  "normal"
]);

const [selectedCategory, setSelectedCategory] = useState("All");
 const category = (val:string)=>{
    if(val == "All"){
const filteredProducts =  products.filter(() =>   val ? true : false);
 setSelectedCategory(val)
 setProducts(filteredProducts);
     } else if(val == "Cakes"){
const filteredProducts = products.filter((p) =>  p.type === val);
 setSelectedCategory(val)
 setProducts(filteredProducts);
     } else if(val == "Brownies"){
const filteredProducts = products.filter((p) =>  p.type === val);
 setSelectedCategory(val)
 setProducts(filteredProducts);
     } 
}

const sort = (val:string)=>{
     if(val == "low"){
const sortedProducts = products.sort((a, b) =>  a.price - b.price);
 console.log(val,sortedProducts);
let a = [...sortedProducts,"low"]
setProducts(a);
     } else if(val == "high"){
const sortedProducts = products.sort((a, b) =>  b.price - a.price);
let a = [...sortedProducts,"high"]
setProducts(a);
     }
}





  return (
     <div className="min-h-screen bg-[#FFF4E8] px-4 sm:px-6 lg:px-12 py-6">
      <div className="w-full max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          <svg
      width="220"
      height="70"
      viewBox="0 0 220 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cupcake */}
      <rect x="10" y="28" width="36" height="22" rx="4" fill="#F4C16D" />
      <path
        d="M10 28 C14 10, 42 10, 46 28 Z"
        fill="#F7A7C1"
      />
      <circle cx="28" cy="14" r="4" fill="#E94E77" />

      {/* Text */}
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
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => category(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow"
                  : "bg-white text-gray-700 border hover:bg-orange-100"
              }`}
            >
              {cat}
            </button>
          ))}
          
        </div>

        {/* Sort */}
        <div className="flex  justify-center sm:justify-end">
        <div className="mb-6 max-w-xs ">
         <select
  className="w-full rounded-xl px-4 py-3 bg-white shadow-sm border text-sm "
     onChange={(e) => sort(e.target.value as "low" | "high")}

>
  <option  className="text-center bg-blue-100">Select a category</option>

  <option value="low">Price: Low to High</option>
  <option value="high">Price: High to Low</option>
</select>
        </div>
        </div>


        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {product.filter((item) => typeof item !== "string").map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-32 sm:h-40 md:h-44 lg:h-48 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                  {product.name}
                </h3>
                <p className="text-orange-600 font-bold text-sm sm:text-base mt-1">
                  ₹{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default App;
