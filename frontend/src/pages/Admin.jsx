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
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const total = bookings.length;
  const approved = bookings.filter(b => b.status === "approved").length;
  const pending = bookings.filter(b => !b.status || b.status === "pending").length;
  const rejected = bookings.filter(b => b.status === "rejected").length;

  const chartData = [
    { name: "Approved", value: approved },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#22c55e", "#eab308", "#ef4444"];

  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter(b => (b.status || "pending") === filter);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-red-600 mb-6">
        Admin Dashboard 👨‍💼
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total", value: total, color: "bg-blue-500" },
          { label: "Approved", value: approved, color: "bg-green-500" },
          { label: "Pending", value: pending, color: "bg-yellow-500" },
          { label: "Rejected", value: rejected, color: "bg-red-500" },
        ].map((c, i) => (
          <div key={i} className={`${c.color} text-white p-4 rounded-xl`}>
            <p>{c.label}</p>
            <h2 className="text-xl font-bold">{c.value}</h2>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="mb-3 font-semibold">Booking Analytics</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={80}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>




      import { toast } from "react-toastify";

const handleApprove = async (id) => {
  await approveBooking(id);
  toast.success("Approved ✅");
  fetchData();
};

      {/* BOOKINGS */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        {filtered.map((b) => (
          <div key={b._id} className="flex justify-between p-3 border mb-2">
            <div>
              <p>{b.service}</p>
              <p className="text-sm">{b.email}</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => {
                approveBooking(b._id);
                toast.success("Approved ✅");
                fetchData();
              }}>✔</button>

              <button onClick={() => {
                rejectBooking(b._id);
                toast.warning("Rejected ❌");
                fetchData();
              }}>✖</button>

              <button onClick={() => {
                deleteBooking(b._id);
                toast.error("Deleted 🗑");
                fetchData();
              }}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* USERS */}
      <div className="bg-white p-4 rounded-xl shadow">
        {users.map((u) => (
          <div key={u._id} className="flex justify-between border p-2 mb-2">
            <div>{u.name}</div>
            <button onClick={() => {
              deleteUser(u.email);
              fetchData();
            }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}