import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ================= AUTH =================
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= BOOKINGS =================
export const createBooking = (data) =>
  API.post("/bookings", data);

export const getUserBookings = (email) =>
  API.get(`/bookings/user/${email}`);

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

export const deleteUser = (email) =>
  API.delete(`/admin/users/${email}`);