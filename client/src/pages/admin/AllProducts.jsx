import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import { AdminMenu } from "../../components/layout/AdminMenu";
import instance from "../../axios";

const Allproducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedProduct, setUpdatedProduct] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await instance.get(
                    "/product/get-product"
                );
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await instance.delete(`/product/product/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
            alert("Product deleted successfully!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setUpdatedProduct(product);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await instance.put(
                `/product/update-product/${selectedProduct._id}`,
                updatedProduct
            );
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product._id === selectedProduct._id ? updatedProduct : product
                )
            );
            alert("Product updated!");
            handleModalClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Layout>
            <div className="flex">
                <div>
                    <AdminMenu />
                </div>
                <div className="w-full">
                    <h1 className="text-xl font-bold mb-4">All Products</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {products.map((product) => (
                            <div key={product._id} className="border p-4 rounded">
                                <img
                                    src={`http://localhost:3000/api/v1/product/get-product/${product._id}`}
                                    alt={product.name}
                                    className="h-40 w-full object-cover mb-2"
                                />
                                <h2 className="font-bold">{product.name}</h2>
                                <p>{product.description}</p>
                                <p>${product.price}</p>
                                <p>Category: {product.category?.name || "No category provided"}</p>

                                <p>Quantity: {product.quantity}</p>
                                <div className="flex gap-2 mt-2">
                                    <button
                                        onClick={() => handleUpdate(product)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded"
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
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
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
                            <input
                                type="text"
                                name="category"
                                value={updatedProduct.category || ""}
                                onChange={handleInputChange}
                                placeholder="Category"
                                className="border p-2 rounded"
                            />
                            <input
                                type="number"
                                name="quantity"
                                value={updatedProduct.quantity || ""}
                                onChange={handleInputChange}
                                placeholder="Quantity"
                                className="border p-2 rounded"
                            />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={handleSaveChanges}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
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
