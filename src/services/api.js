// page/admin/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // sửa theo cổng json-server của bạn
});

export default API;
