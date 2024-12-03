import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/layout/layout";
import { AdminMenu } from "../../components/layout/AdminMenu";
import instance from "../../axios";

const Createproducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    photo: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Функция для получения категорий
  const fetchCategories = async () => {
    try {
      const response = await instance.get(
        "/category/get-category"
      );
      console.log("Fetched category data:", response.data); 
      if (response.data && response.data.category) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Ошибка при подключении к серверу");
    }
  };

  useEffect(() => {
    fetchCategories(); 
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await instance.post(
        "/product/create-product",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Product created!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          photo: null,
        });
      } else {
        alert(`Error: ${response.data.error || response.data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ошибка при создании продукта.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div className="w-full">
          <h2 className="text-lg font-bold mb-4">Create New Product</h2>
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white rounded shadow-md"
          >
            {loading && (
              <div className="text-blue-500 font-bold">Submitting...</div>
            )}
            <div className="mb-4">
              <label className="block font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Photo</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full border rounded p-2"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Createproducts;
