import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-booking-01hy.onrender.com/api",
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

// BOOKINGS
export const createBooking = (data) => API.post("/booking", data);
export const getUserBookings = (email) =>
  API.get(`/booking/user?email=${email}`);
export const deleteBooking = (id) =>
  API.delete(`/booking/${id}`);

// ADMIN
export const getAllBookings = () => API.get("/admin/bookings");
export const approveBooking = (id) =>
  API.put(`/admin/approve/${id}`);
export const rejectBooking = (id) =>
  API.put(`/admin/reject/${id}`);
export const deleteBookingAdmin = (id) =>
  API.delete(`/admin/${id}`);

export const getAllUsers = () => API.get("/admin/users");
export const deleteUser = (email) =>
  API.delete(`/admin/user/${email}`);