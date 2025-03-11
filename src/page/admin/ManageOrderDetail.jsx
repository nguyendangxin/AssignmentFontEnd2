import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ManageOrderDetail = () => {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/orders/${id}`);
      setOrder(res.data);
    } catch (error) {
      console.error("Lỗi khi tải đơn hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="font-bold mb-4 text-gray-800 dark:text-white text-4xl">
        Chi tiết đơn hàng
      </h2>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-300">Đang tải dữ liệu...</p>
      ) : !order ? (
        <p className="text-gray-600 dark:text-gray-300">
          Không tìm thấy đơn hàng.
        </p>
      ) : (
        <div className="space-y-3 text-gray-700 dark:text-gray-200">
          <div className="text-2xl">
            <p>
              <strong>Khách hàng:</strong> {order.customerName}
            </p>
            <p>
              <strong>Sản phẩm:</strong> {order.productName}
            </p>
            <p>
              <strong>Số lượng:</strong> {order.quantity}
            </p>
            <p>
              <strong>Đơn giá:</strong> {order.price.toLocaleString()}đ
            </p>
            <p>
              <strong>Tổng tiền:</strong> {order.total.toLocaleString()}đ
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
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
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrderDetail;
