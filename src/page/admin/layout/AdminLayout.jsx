// AdminLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";
import { ToastContainer } from "react-toastify";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`flex min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      } transition-all`}
    >
      {/* Sidebar */}
      <div
        className={`h-screen ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        } shadow-md transition-all duration-300 z-30 ${
          sidebarOpen ? "w-64" : "w-16"
        } fixed top-0 left-0`}
      >
        <div className="flex items-center justify-between p-4 border-gray-300 dark:border-gray-700">
          <span className="text-xl font-bold text-blue-600 truncate">
            {sidebarOpen && "Admin"}
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <nav className="mt-4 space-y-2 text-sm">
          <Link
            to="/admin/"
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fa-solid fa-chart-pie"></i>
            {sidebarOpen && "Dashboard"}
          </Link>
          <Link
            to="/admin/manage-customers"
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fa-solid fa-users"></i>
            {sidebarOpen && "Customers"}
          </Link>
          <Link
            to="/admin/manage-orders"
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fa-solid fa-clipboard"></i>
            {sidebarOpen && "Orders"}
          </Link>
          <Link
            to="/admin/manage-products"
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fa-solid fa-box"></i>
            {sidebarOpen && "Products"}
          </Link>
          <Link
            to="/admin/manage-categories"
            className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <i class="fa-solid fa-layer-group"></i>
            {sidebarOpen && "Categories"}
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        } w-full`}
      >
        {/* Topbar */}
        <div
          className={`flex items-center justify-between p-4 shadow ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          } border-b dark:border-gray-700 sticky top-0 z-20`}
        >
          <div className="flex items-center gap-2"></div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={handleLogout}
              className="text-red-500 font-semibold"
            >
              Đăng xuất
            </button>

            <div className="flex items-center gap-2">
              <img
                src="https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D"
                alt="avatar"
                className="rounded-full w-8 h-8"
              />
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 text-gray-800 dark:text-gray-100">
          <Outlet />
        </div>

        {/* Footer */}
        <footer
          className={`text-center py-4 text-sm border-t dark:border-gray-700 ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-600"
          }`}
        >
          <p>© {new Date().getFullYear()} Admin Assigment fe2.</p>
        </footer>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminLayout;
