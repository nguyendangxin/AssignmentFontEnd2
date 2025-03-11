// ManageOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi khi tải đơn hàng:", err);
      toast.error("Lỗi khi tải đơn hàng!");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const orderToUpdate = orders.find((order) => order.id === id);
      if (!orderToUpdate) return;

      const updatedOrder = { ...orderToUpdate, status: newStatus };
      await axios.put(`http://localhost:4000/orders/${id}`, updatedOrder);

      const updatedOrders = orders.map((order) =>
        order.id === id ? updatedOrder : order
      );
      setOrders(updatedOrders);
      toast.success("Cập nhật trạng thái đơn hàng thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái:", err);
      toast.error("Lỗi khi cập nhật trạng thái!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Quản lý đơn hàng
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Khách hàng</th>
              <th className="p-3">Sản phẩm</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Đơn giá</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  Không có đơn hàng nào.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customerName}</td>
                  <td className="p-3">{order.productName}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">{order.price.toLocaleString()}₫</td>
                  <td className="p-3">{order.total.toLocaleString()}₫</td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-sm dark:bg-gray-800 dark:text-white"
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <Link to={"/admin/manage-orders/" + order.id}>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                        DETAIL
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

export default ManageOrders;
