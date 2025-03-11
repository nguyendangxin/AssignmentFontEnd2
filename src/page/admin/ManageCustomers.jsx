// ManageCustomers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const ManageCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/customers");
      setCustomers(res.data);
      setFilteredCustomers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách khách hàng:", err);
      toast.error("Lỗi khi tải khách hàng!");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa không !")) {
      try {
        await axios.delete(`http://localhost:4000/customers/${id}`);
        const updated = customers.filter((customer) => customer.id !== id);
        setCustomers(updated);
        setFilteredCustomers(
          searchTerm
            ? updated.filter((c) =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : updated
        );
        toast.success("Xóa khách hàng thành công!");
      } catch (err) {
        console.error("Lỗi khi xóa khách hàng:", err);
        toast.error("Lỗi khi xóa khách hàng!");
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = customers.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Quản lý khách hàng
      </h2>

      {/* Tìm kiếm khách hàng */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm theo tên khách hàng..."
          className="border px-3 py-2 rounded text-sm w-full max-w-xs dark:bg-gray-800 dark:text-white"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Tên khách hàng</th>
              <th className="p-3">Email</th>
              <th className="p-3">Số điện thoại</th>
              <th className="p-3">Địa chỉ</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  Không có khách hàng nào.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{customer.id}</td>
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.email}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Xóa
                    </button>
                    <Link
                      to={`/admin/manage-customers/${encodeURIComponent(
                        customer.name
                      )}`}
                    >
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs">
                        History
                      </button>
                    </Link>
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

export default ManageCustomers;
