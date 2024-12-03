import { useState, useEffect } from "react";
import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import instance from "../../axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]); // Categories state
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await instance.get("/category/get-category");
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

  // Handle form submission for creating a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post(`/category/create-category`, { name });
      if (data?.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };

  // Handle delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await instance.delete(`/category/delete-category/${id}`);
      if (data?.success) {
        toast.success("Category deleted successfully");
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    }
  };

  // Open modal for updating category
  const handleUpdateClick = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  // Handle update category
  const handleUpdate = async () => {
    try {
      const { data } = await instance.put(`/category/update-category/${editingCategory._id}`, {
        name: editingCategory.name,
      });
      if (data?.success) {
        toast.success("Category updated successfully");
        setModalOpen(false);
        getAllCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating category");
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Create Category
            </button>
          </form>

          <h2 className="text-xl font-bold mt-6">Existing Categories</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((cat) => (
              <li key={cat._id} className="p-2 border rounded-md flex justify-between items-center">
                {cat.name}
                <div>
                  <button
                    onClick={() => handleUpdateClick(cat)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Update Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4">Update Category</h3>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              required
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CreateCategory;
