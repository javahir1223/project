import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/layout';
import { AdminMenu } from '../../components/layout/AdminMenu';
import instance from '../../axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [adminData, setAdminData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          instance.get('/product/get-product'),
          instance.get('/category/get-category'),
        ]);

        const userData = JSON.parse(localStorage.getItem('auth'))?.user;

        setProducts(productsResponse.data.products || []);
        setCategories(categoriesResponse.data.category || []);
        setAdminData(userData);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout title={"Admin dashboard"}>
      <div className="flex flex-col md:flex-row">
        <AdminMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <div className="w-full md:w-3/4 p-6 md:ml-64">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <button
              className="md:hidden text-lg p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
          </div>

          {adminData && (
            <div className="bg-white p-6 mb-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Admin Information</h2>
              <p className="mt-2">Name: {adminData.name}</p>
              <p>Email: {adminData.email}</p>
              <p>Role: {adminData.role === 1 ? 'Admin' : 'User'}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Total Products</h3>
              <p className="text-2xl font-bold">{products.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Total Categories</h3>
              <p className="text-2xl font-bold">{categories.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h3 className="text-xl font-semibold mb-4">Latest Products</h3>
              <ul>
                {products.slice(-5).map((product) => (
                  <li key={product._id} className="mb-2">
                    {product.name} - {product.category.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
