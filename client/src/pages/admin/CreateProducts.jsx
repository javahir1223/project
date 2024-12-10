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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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
    <Layout   title={"Create product"}>
      <div className="flex flex-col lg:flex-row">
      <AdminMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <div className="w-full max-w-lg mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold mb-4 text-center">
            Создать новый продукт
          </h1>
            <button
              className="md:hidden text-lg p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
          </div>
         
          
          <form onSubmit={handleSubmit} className="bg-white rounded shadow-md p-4 md:p-6">
            {loading && <div className="text-blue-500 font-bold mb-4">Отправка...</div>}
            
            <div className="mb-4">
              <label className="block font-semibold text-sm md:text-base">Название</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm md:text-base">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm md:text-base">Цена</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm md:text-base">Категория</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
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
              <label className="block font-semibold text-sm md:text-base">Количество</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold text-sm md:text-base">Фото</label>
              <input
                type="file"
                name="photo"
                onChange={handleChange}
                className="w-full border rounded p-2 text-sm md:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded mt-4 hover:bg-blue-600 transition"
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
