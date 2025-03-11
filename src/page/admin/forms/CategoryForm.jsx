// forms/CategoryForm.jsx
import React from "react";

const CategoryForm = ({ form, setForm, handleSubmit, isEditing }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white dark:bg-gray-800 rounded shadow"
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        {isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
      </h3>

      <div className="mb-3">
        <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
          Tên danh mục
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Nhập tên danh mục..."
          required
          className="w-full border px-3 py-2 rounded text-sm dark:bg-gray-700 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        {isEditing ? "Cập nhật" : "Thêm mới"}
      </button>
    </form>
  );
};

export default CategoryForm;
