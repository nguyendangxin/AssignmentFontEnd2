// forms/ProductForm.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({ form, setForm, handleSubmit, isEditing }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh mục:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Tên sản phẩm
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Giá
        </label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Tồn kho
        </label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Danh mục
        </label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Thương hiệu
        </label>
        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Dung tích (ml)
        </label>
        <input
          type="number"
          name="volume"
          value={form.volume}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Ảnh sản phẩm (URL)
        </label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Mô tả
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        ></textarea>
      </div>

      <div className="md:col-span-2 text-right">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {isEditing ? "Cập nhật" : "Thêm mới"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
