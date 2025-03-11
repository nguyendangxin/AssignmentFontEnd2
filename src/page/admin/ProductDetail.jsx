// pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Đang tải...</div>;
  if (!product)
    return (
      <div className="text-center py-10 text-red-500">
        Không tìm thấy sản phẩm.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <Link
        to="/admin/manage-products"
        className="text-blue-600 hover:underline block mb-4"
      >
        ← Quay lại danh sách
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={product.image || "https://via.placeholder.com/300"}
            alt={product.name}
            className="w-full h-auto rounded border"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold dark:text-white mb-2">
            {product.name}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Giá: <strong>{product.price.toLocaleString()}₫</strong>
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Tồn kho: {product.stock}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Danh mục: {product.category}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Thương hiệu: {product.brand}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-1">
            Dung tích: {product.volume}ml
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-4">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
