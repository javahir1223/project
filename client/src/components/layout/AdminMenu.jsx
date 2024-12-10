import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa';

export const AdminMenu = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 md:z-auto z-[1001] w-64 bg-gray-800 text-gray-300 p-5 flex flex-col shadow-lg transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-purple-400">Shop</h2>
      </div>

      <ul className="space-y-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        <li>
          <Link to={'/dashboard/admin'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
            🏠 Dashboard
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/admin/category'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
            📂➕ Create Categories
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/admin/products'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
            📚 All Products
          </Link>
        </li>
        <li>
          <Link to={'/dashboard/admin/create'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
            💻 Create Products
          </Link>
        </li>
      </ul>

      <div className="mt-8 flex gap-4 justify-center text-white">
        <a href="#" className="hover:text-pink-500 transition">
          <FaInstagram className="text-2xl" />
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          <FaTelegram className="text-2xl" />
        </a>
        <a href="#" className="hover:text-gray-400 transition">
          <FaGithub className="text-2xl" />
        </a>
        <a href="#" className="hover:text-red-500 transition">
          <FaYoutube className="text-2xl" />
        </a>
      </div>

      <button
        className="absolute top-4 right-4 md:hidden text-gray-300 text-2xl"
        onClick={() => setIsSidebarOpen(false)}
      >
        ✕
      </button>
    </div>
  );
};
