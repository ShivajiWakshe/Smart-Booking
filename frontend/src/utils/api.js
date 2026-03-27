import axios from "axios";

// ✅ LIVE BACKEND URL (Render)
const API = axios.create({
  baseURL: "https://smart-booking-01hy.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically (if exists)
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= AUTH =================
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= BOOKINGS =================
export const createBooking = (data) =>
  API.post("/bookings", data);

export const getUserBookings = (userId) =>
  API.get(`/bookings/user/${userId}`);

export const getAllBookings = () =>
  API.get("/bookings");

export const approveBooking = (id) =>
  API.put(`/bookings/approve/${id}`);

export const rejectBooking = (id) =>
  API.put(`/bookings/reject/${id}`);

export const deleteBooking = (id) =>
  API.delete(`/bookings/${id}`);

// ================= USERS (ADMIN) =================
export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

export default API;