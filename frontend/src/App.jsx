import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🏠 MAIN */}
        <Route path="/" element={<Dashboard />} />

        {/* 🔐 AUTH (KEEP SAME) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* 📦 BOOKING */}
        <Route path="/booking/:type" element={<Booking />} />

        {/* 📖 USER FEATURES */}
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}