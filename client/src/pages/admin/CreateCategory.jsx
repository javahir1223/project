import { useState, useEffect } from "react";
import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import axios from "axios"; // Ensure axios is imported
import { toast } from "react-toastify";


const CreateCategory = () => {
  const [categories, setCategories] = useState([]); // Categories state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null); // For file uploads
  const [message, setMessage] = useState(null);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/category/get-category");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong in fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      if (photo) {
        formData.append("photo", photo);
      }

      const { data } = await axios.post(
        "http://localhost:3000/api/v1", // Update to the correct backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      if (data?.success) {
        toast.success(`${name} is created`);
        setMessage({ type: "success", text: data.message });
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping("");
        setPhoto(null);
        getAllCategories(); // Refresh categories list
      } else {
        setMessage({ type: "error", text: data.message });
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Error creating category" });
      toast.error("Something went wrong in creating category");
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Create Category</h1>
          {message && (
            <div
              className={`mb-4 p-2 rounded ${
                message.type === "success" ? "bg-green-200" : "bg-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category type"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-md"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter quantity"
              />
            </div>

            {/* Shipping */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Shipping (Yes/No)
              </label>
              <select
                className="w-full px-4 py-2 border rounded-md"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              >
                <option value="">Select shipping option</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Photo
              </label>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Category
            </button>
          </form>

          {/* Categories List */}
          <h2 className="text-xl font-bold mt-6">Existing Categories</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((cat, index) => (
              <li key={index} className="p-2 border rounded-md">
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
