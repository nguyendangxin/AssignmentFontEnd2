// pages/NotFound.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-2">
        Trang không tồn tại
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Trang bạn đang tìm kiếm không được tìm thấy hoặc đã bị xóa.
      </p>
      <Link
        to="/admin/dashboard"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
