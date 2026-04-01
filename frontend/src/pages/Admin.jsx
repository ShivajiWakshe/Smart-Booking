import { useEffect, useState } from "react";
import {
  getAllBookings,
  approveBooking,
  rejectBooking,
  deleteBooking,
  getAllUsers,
  deleteUser,
} from "../utils/api";

import { toast } from "react-toastify";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  // 🔄 FETCH DATA
  const fetchData = async () => {
    try {
      const b = await getAllBookings();
      const u = await getAllUsers();
      setBookings(b.data);
      setUsers(u.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  // 📊 STATS
  const total = bookings.length;
  const approved = bookings.filter(b => b.status === "approved").length;
  const pending = bookings.filter(b => !b.status || b.status === "pending").length;
  const rejected = bookings.filter(b => b.status === "rejected").length;

  // 📊 CHART DATA
  const chartData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  // 🔍 FILTER
  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter(b => (b.status || "pending") === filter);

  // ✅ ACTION HANDLERS
  const handleApprove = async (id) => {
    try {
      await approveBooking(id);
      toast.success("Booking Approved ✅");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectBooking(id);
      toast.warning("Booking Rejected ❌");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      toast.error("Booking Deleted 🗑️");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      await deleteUser(email);
      toast.error("User Deleted 👤");
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* 🔥 HEADER */}
      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Admin Dashboard 👨‍💼
      </h1>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: total, color: "bg-blue-500" },
          { label: "Approved", value: approved, color: "bg-green-500" },
          { label: "Pending", value: pending, color: "bg-yellow-500" },
          { label: "Rejected", value: rejected, color: "bg-red-500" },
        ].map((c, i) => (
          <div key={i} className={`${c.color} text-white p-4 rounded-xl shadow`}>
            <p>{c.label}</p>
            <h2 className="text-xl font-bold">{c.value}</h2>
          </div>
        ))}
      </div>

      {/* 📊 CHART */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="mb-3 font-semibold">Booking Analytics</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={80} label>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔍 FILTER BUTTONS */}
      <div className="flex gap-3 mb-4">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white shadow"
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 📋 BOOKINGS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">All Bookings</h2>

        {filtered.length === 0 ? (
          <p className="text-gray-500 text-sm">No bookings found</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((b) => (
              <div
                key={b._id}
                className="p-4 border rounded-lg flex justify-between items-center hover:shadow"
              >
                <div>
                  <p className="font-semibold capitalize">{b.service}</p>
                  <p className="text-sm text-gray-500">{b.email}</p>
                  <p className="text-xs text-gray-400">
                    {b.date} • {b.time || b.slot}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(b._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs"
                  >
                    ✔
                  </button>

                  <button
                    onClick={() => handleReject(b._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                  >
                    ✖
                  </button>

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 👤 USERS */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">Users</h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">No users found</p>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div
                key={u._id}
                className="flex justify-between items-center border p-2 rounded"
              >
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>

                <button
                  onClick={() => handleDeleteUser(u.email)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}