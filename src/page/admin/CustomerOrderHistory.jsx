import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomerOrderHistory = () => {
  const { customerName } = useParams(); // truyền customerName qua URL
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:4000/orders");
      const customerOrders = res.data.filter(
        (order) => order.customerName === customerName
      );
      setOrders(customerOrders);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    }
  };

  const getProductImage = (productName) => {
    const product = products.find((p) =>
      p.name.toLowerCase().includes(productName.toLowerCase())
    );
    return product?.image || "https://via.placeholder.com/100";
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Lịch sử đơn hàng của {customerName}
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Đang tải dữ liệu...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          Không có đơn hàng nào.
        </p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Hình
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Sản phẩm
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Số lượng
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Tổng tiền
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600 dark:text-white">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-2">
                    <img
                      src={getProductImage(order.productName)}
                      alt={order.productName}
                      className="w-16 h-16 rounded object-cover"
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {order.productName}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {order.quantity}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    {order.total.toLocaleString()}đ
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full
                        ${
                          order.status === "Đã giao"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Đang xử lý"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerOrderHistory;
