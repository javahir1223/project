import React from 'react'
import Layout from './layout'
import { Link } from 'react-router-dom'
import { FaGithub, FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa'

export const AdminMenu = () => {
    return (
            <div className="flex">
                <aside className="w-64 min-h-screen bg-gray-800 text-gray-300 p-5 flex flex-col shadow-lg">
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
                            <Link  to={'/dashboard/admin/category'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
                                📂➕ Create Categories
                            </Link>
                        </li>
                        <li>
                            <Link  to={'/dashboard/admin/products'} className="block py-2 px-4 hover:bg-gray-700 rounded transition">
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
                        <a href="#" className="hover:text-pink-500 transition"><FaInstagram className="text-2xl" /></a>
                        <a href="#" className="hover:text-blue-400 transition"><FaTelegram className="text-2xl" /></a>
                        <a href="#" className="hover:text-gray-400 transition"><FaGithub className="text-2xl" /></a>
                        <a href="#" className="hover:text-red-500 transition"><FaYoutube className="text-2xl" /></a>
                    </div>
                </aside>
            </div>
    )
}
