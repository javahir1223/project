import React, { useState, useEffect } from "react";
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
      const response = await instance.get("/category/get-category");
      if (response.data && response.data.category) {
        setCategories(response.data.category);
      } else {
        console.error("Категории не найдены");
      }
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
      alert("Ошибка при получении категорий.");
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
      const response = await instance.post("/product/create-product", data);

      if (response.status === 200 || response.status === 201) {
        alert("Продукт создан!");
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          quantity: "",
          photo: null,
        });
      } else {
        alert(`Ошибка: ${response.data.error || response.data.message}`);
      }
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
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
          <h2 className="text-lg font-bold mb-4">Создать новый продукт</h2>
          <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
            {loading && (
              <div className="text-blue-500 font-bold">Отправка...</div>
            )}
            <div className="mb-4">
              <label className="block font-semibold">Название</label>
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
              <label className="block font-semibold">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Цена</label>
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
              <label className="block font-semibold">Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Выберите категорию</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Количество</label>
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
              <label className="block font-semibold">Фото</label>
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
              Отправить
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Createproducts;
