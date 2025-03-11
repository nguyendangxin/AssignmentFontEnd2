// ManageCategories.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryForm from "./forms/CategoryForm";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh mục:", err);
      toast.error("Lỗi khi tải danh mục!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/categories/${editId}`, form);
        toast.success("Cập nhật danh mục thành công!");
      } else {
        await axios.post("http://localhost:3001/categories", form);
        toast.success("Thêm danh mục thành công!");
      }
      fetchCategories();
      setForm({ name: "" });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Lỗi khi lưu danh mục:", err);
      toast.error("Lỗi khi lưu danh mục!");
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name });
    setIsEditing(true);
    setEditId(category.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa không !")) {
      try {
        await axios.delete(`http://localhost:3001/categories/${id}`);
        toast.success("Xóa danh mục thành công!");
        fetchCategories();
      } catch (err) {
        console.error("Lỗi khi xóa danh mục:", err);
        toast.error("Lỗi khi xóa danh mục!");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Quản lý danh mục
      </h2>

      <CategoryForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Tên danh mục</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  Không có danh mục nào.
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCategories;
