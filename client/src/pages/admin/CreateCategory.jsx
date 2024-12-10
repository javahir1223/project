import { useState, useEffect } from "react";
import { AdminMenu } from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import { toast } from "react-toastify";
import instance from "../../axios";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post(`/category/create-category`, {
        name,
      });
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

  const handleUpdateClick = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      const { data } = await instance.put(
        `/category/update-category/${editingCategory._id}`,
        {
          name: editingCategory.name,
        }
      );
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
    <Layout title={"Create category"}>
      <div className="flex flex-col md:flex-row">
        <div
          className={`md:w-1/4 w-full ${
            isSidebarOpen ? "block" : "hidden"
          } md:block`}
        >
          <AdminMenu
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div className="w-full md:w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Create Category</h1>
            <button
              className="md:hidden p-2 text-lg"
              onClick={() => {
                console.log("Клик по кнопке");
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              ☰
            </button>
          </div>

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
              <li
                key={cat._id}
                className="p-2 border rounded-md flex justify-between items-center"
              >
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
        <div className="fixed inset-0 z-[1001] bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Update Category</h3>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md mb-4"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
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
