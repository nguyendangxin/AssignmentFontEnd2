// ManageProducts.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "./forms/ProductForm";
import { Link } from "react-router";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    volume: "",
    image: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
      toast.error("Lỗi khi tải sản phẩm!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/products/${editId}`, form);
        toast.success("Cập nhật sản phẩm thành công!");
      } else {
        await axios.post("http://localhost:3001/products", form);
        toast.success("Thêm sản phẩm thành công!");
      }
      fetchProducts();
      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        brand: "",
        volume: "",
        image: "",
        description: "",
      });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Lỗi khi lưu sản phẩm:", err);
      toast.error("Lỗi khi lưu sản phẩm!");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      brand: product.brand,
      volume: product.volume,
      image: product.image,
      description: product.description,
    });
    setIsEditing(true);
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc muốn xóa không !")) {
      try {
        await axios.delete(`http://localhost:3001/products/${id}`);
        toast.success("Xóa sản phẩm thành công!");
        fetchProducts();
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        toast.error("Lỗi khi xóa sản phẩm!");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Quản lý sản phẩm
      </h2>

      {/* Form Thêm / Sửa sản phẩm */}
      <ProductForm
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
      />

      {/* Bảng danh sách sản phẩm */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Tên sản phẩm</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Tồn kho</th>
              <th className="p-3">Danh mục</th>
              <th className="p-3">Thương hiệu</th>
              <th className="p-3">Dung tích</th>
              <th className="p-3">Ảnh</th>
              <th className="p-3">Mô tả</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-4 text-gray-500 dark:text-gray-400"
                >
                  Không có sản phẩm nào.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.price.toLocaleString()}đ</td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.brand}</td>
                  <td className="p-3">{product.volume}ml</td>
                  <td className="p-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      "Không có ảnh"
                    )}
                  </td>
                  <td className="p-3">{product.description}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Xóa
                    </button>
                    <Link to={product.id}>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs">
                        Detail
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

export default ManageProducts;
