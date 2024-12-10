import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { AdminMenu } from "../../components/layout/AdminMenu";
import instance from "../../axios";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [photo, setPhoto] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // Получение продуктов и категорий
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          instance.get("/product/get-product"),
          instance.get("/category/get-category"),
        ]);

        console.log("Продукты:", productsResponse.data);
        console.log("Категории:", categoriesResponse.data);

        setProducts(productsResponse.data.products || []);
        setCategories(categoriesResponse.data.category || []);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      await instance.delete(`/product/product/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({ ...product });
    setPhoto(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find((cat) => cat._id === value);
      setUpdatedProduct((prev) => ({
        ...prev,
        category: selectedCategory,
      }));
    } else {
      setUpdatedProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name || "");
    formData.append("description", updatedProduct.description || "");
    formData.append("price", updatedProduct.price || 0);
    formData.append("category", updatedProduct.category?._id || "");
    formData.append("quantity", updatedProduct.quantity || 0);
    if (photo) {
      formData.append("photo", photo);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    console.log("Отправка данных на сервер...");

    try {
      const response = await instance.put(
        `/product/update-product/${selectedProduct._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Ответ от сервера:", response);
      if (response.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProduct._id
              ? {
                  ...updatedProduct,
                  photo: photo ? URL.createObjectURL(photo) : product.photo,
                }
              : product
          )
        );
        alert("Product updated successfully!");
        handleModalClose();
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <Layout title={"All product"}>
      <div className="flex flex-col md:flex-row">
        <div>
          <AdminMenu
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
        <div className="item-center justify-center flex flex-col ml-[300px] p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-4">All Products</h1>
            <button
              className="md:hidden text-lg p-2"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow-sm">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="h-40 w-full object-cover mb-2 rounded"
                />
                <h2 className="font-bold">{product.name}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="font-semibold">${product.price}</p>
                <p>
                  Category: {product.category?.name || "No category provided"}
                </p>
                <p>Quantity: {product.quantity}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleUpdate(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Update Product</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={updatedProduct.name || ""}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="description"
                value={updatedProduct.description || ""}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="price"
                value={updatedProduct.price || ""}
                onChange={handleInputChange}
                placeholder="Price"
                className="border p-2 rounded"
              />

              <select
                name="category"
                value={updatedProduct.category?._id || ""}
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (cat) => cat._id === e.target.value
                  );
                  setUpdatedProduct((prev) => ({
                    ...prev,
                    category: selectedCategory || null,
                  }));
                }}
                className="border p-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="quantity"
                value={updatedProduct.quantity || ""}
                onChange={handleInputChange}
                placeholder="Quantity"
                className="border p-2 rounded"
              />
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Allproducts;
