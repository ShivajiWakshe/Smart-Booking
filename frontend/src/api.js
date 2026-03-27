import axios from "axios";

// ✅ Your LIVE backend
const api = axios.create({
  baseURL: "https://smart-booking-01hy.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically (optional but best)
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;