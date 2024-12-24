import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.118.107:3000/api",
});

export default axiosInstance;
