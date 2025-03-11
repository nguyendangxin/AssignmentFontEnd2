// page/admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { ShoppingCart, Package, Users, DollarSign } from "lucide-react";
import API from "../../services/api";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [processingCount, setProcessingCount] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resProducts = await API.get("http://localhost:4000/products");
        const resOrders = await API.get("http://localhost:4000/orders");
        const resCustomers = await API.get("http://localhost:4000/customers");

        setTotalProducts(resProducts.data.length);
        setTotalOrders(resOrders.data.length);
        setTotalCustomers(resCustomers.data.length);

        // Tổng doanh thu: cộng tổng price của các orders (nếu có)
        const revenue = resOrders.data.reduce(
          (sum, order) => sum + (order.total || 0),
          0
        );
        setTotalRevenue(revenue);
      } catch (error) {
        console.error("Lỗi load dữ liệu dashboard:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("http://localhost:4000/orders");
        const data = res.data;

        setOrders(data);

        // Tính tổng doanh thu
        const total = data.reduce(
          (sum, order) =>
            sum + (order.total || order.price * (order.quantity || 1)),
          0
        );
        setTotalRevenue(total);

        // Đếm số đơn hàng theo trạng thái
        setDeliveredCount(data.filter((o) => o.status === "Đã giao").length);
        setProcessingCount(
          data.filter((o) => o.status === "Đang xử lý").length
        );

        // Chuẩn bị dữ liệu biểu đồ
        const grouped = {};
        data.forEach((order) => {
          const product = order.productName || "Sản phẩm khác";
          const revenue = order.total || order.price * (order.quantity || 1);
          if (grouped[product]) {
            grouped[product] += revenue;
          } else {
            grouped[product] = revenue;
          }
        });

        const chart = Object.keys(grouped).map((product) => ({
          product,
          revenue: grouped[product],
        }));

        setChartData(chart);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu đơn hàng:", err);
      }
    };

    fetchOrders();
  }, []);

  const cards = [
    {
      title: "Tổng đơn hàng",
      value: totalOrders,
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Sản phẩm",
      value: totalProducts,
      icon: <Package className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Khách hàng",
      value: totalCustomers,
      icon: <Users className="w-6 h-6 text-yellow-600" />,
      bg: "bg-yellow-100",
    },
    {
      title: "Doanh thu (₫)",
      value: totalRevenue.toLocaleString(),
      icon: <DollarSign className="w-6 h-6 text-red-600" />,
      bg: "bg-red-100",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Tổng quan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl shadow-lg p-5 flex items-center justify-between ${card.bg} dark:bg-opacity-10`}
          >
            <div>
              <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                {card.title}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.value}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-gray-700 rounded-full shadow">
              {card.icon}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Thống kê doanh thu
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl shadow-md">
            <p className="text-gray-700 dark:text-white text-sm">
              Tổng doanh thu
            </p>
            <p className="text-xl font-bold text-blue-800 dark:text-blue-300">
              {totalRevenue.toLocaleString()} ₫
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl shadow-md">
            <p className="text-gray-700 dark:text-white text-sm">
              Đơn hàng đã giao
            </p>
            <p className="text-xl font-bold text-green-800 dark:text-green-300">
              {deliveredCount}
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-xl shadow-md">
            <p className="text-gray-700 dark:text-white text-sm">
              Đơn hàng đang xử lý
            </p>
            <p className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
              {processingCount}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
            Biểu đồ doanh thu theo sản phẩm
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#4f46e5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
