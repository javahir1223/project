import React, { useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

const FavoritesAndCart = () => {
  // Sample data for Favorites and Cart
  const [favorites, setFavorites] = useState([
    { id: 1, name: "Mahsulot 1", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Mahsulot 2", image: "https://via.placeholder.com/100" },
  ]);

  const [cart, setCart] = useState([
    { id: 1, name: "Mahsulot A", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Mahsulot B", image: "https://via.placeholder.com/100" },
  ]);

  // Handler to remove items (Favorites or Cart)
  const handleRemove = (type, id) => {
    if (type === "favorites") {
      setFavorites(favorites.filter((item) => item.id !== id));
    } else if (type === "cart") {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex flex-wrap gap-8 p-4">
      {/* Favorites Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-semibold flex items-center mb-4 gap-2">
          <FiHeart className="text-red-500" /> Saralangan
        </h2>
        <div className="flex flex-wrap gap-4">
          {favorites.length ? (
            favorites.map((item) => (
              <div
                key={item.id}
                className="w-36 border rounded-lg p-2 shadow-md hover:shadow-lg transition duration-300 bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded-md"
                />
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">{item.name}</p>
                  <button
                    onClick={() => handleRemove("favorites", item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Saralanganlar bo'sh.</p>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-xl font-semibold flex items-center mb-4 gap-2">
          <FiShoppingBag className="text-blue-500" /> Savat
        </h2>
        <div className="flex flex-wrap gap-4">
          {cart.length ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="w-36 border rounded-lg p-2 shadow-md hover:shadow-lg transition duration-300 bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-24 object-cover rounded-md"
                />
                <div className="mt-2">
                  <p className="text-sm font-medium mb-2">{item.name}</p>
                  <button
                    onClick={() => handleRemove("cart", item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Savat bo'sh.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesAndCart;
