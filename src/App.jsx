// App.jsx
import React from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "./page/admin/layout/AdminLayout";
import Dashboard from "./page/admin/Dashboard";
import ManageCustomers from "./page/admin/ManageCustomers";
import ManageOrders from "./page/admin/ManageOrders";
import ManageProducts from "./page/admin/ManageProducts";
import ManageCategories from "./page/admin/ManageCategories";
import ProductDetail from "./page/admin/ProductDetail";
import NotFound from "./page/admin/NotFound";

const routerConfig = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "manage-customers", element: <ManageCustomers /> },
      { path: "manage-orders", element: <ManageOrders /> },
      { path: "manage-products/:id", element: <ProductDetail /> },
      { path: "manage-products", element: <ManageProducts /> },
      { path: "manage-categories", element: <ManageCategories /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];

function App() {
  const routes = useRoutes(routerConfig);
  return routes;
}

export default App;
