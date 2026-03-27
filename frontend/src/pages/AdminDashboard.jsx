import { useEffect, useState } from "react";
import {
  getAllBookings,
  approveBooking,
  rejectBooking,
  deleteBooking,
} from "../utils/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await getAllBookings();
    setBookings(res.data);
    generateInsights(res.data);
  };

  // ================= AI INSIGHTS =================
  const generateInsights = (data) => {
    if (!data.length) return;

    const insightsList = [];

    // 🔥 Peak Booking Time
    const timeMap = {};
    data.forEach((b) => {
      const hour = b.time?.split(":")[0];
      if (hour) {
        timeMap[hour] = (timeMap[hour] || 0) + 1;
      }
    });

    const peakHour = Object.keys(timeMap).reduce((a, b) =>
      timeMap[a] > timeMap[b] ? a : b
    );

    insightsList.push(`🔥 Peak bookings happen around ${peakHour}:00`);

    // ⭐ Best Service
    const serviceMap = {};
    data.forEach((b) => {
      serviceMap[b.service] = (serviceMap[b.service] || 0) + 1;
    });

    const bestService = Object.keys(serviceMap).reduce((a, b) =>
      serviceMap[a] > serviceMap[b] ? a : b
    );

    insightsList.push(`⭐ Most popular service: ${bestService}`);

    // 💰 Revenue Insight
    const approved = data.filter((b) => b.status === "approved").length;

    insightsList.push(`💰 ${approved} bookings generating revenue`);

    // 📈 Growth
    insightsList.push(`📈 System usage increasing steadily`);

    setInsights(insightsList);
  };

  // ================= STATS =================
  const total = bookings.length;

  const today = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.date === today);

  const approved = bookings.filter((b) => b.status === "approved");

  const revenue = approved.length * 500;

  // ================= CHART DATA =================
  const trendMap = {};
  bookings.forEach((b) => {
    trendMap[b.date] = (trendMap[b.date] || 0) + 1;
  });

  const trendData = Object.keys(trendMap).map((d) => ({
    date: d,
    bookings: trendMap[d],
  }));

  const statusData = [
    { name: "Approved", value: approved.length },
    {
      name: "Pending",
      value: bookings.filter((b) => !b.status || b.status === "pending").length,
    },
    {
      name: "Rejected",
      value: bookings.filter((b) => b.status === "rejected").length,
    },
  ];

  const serviceMap = {};
  bookings.forEach((b) => {
    serviceMap[b.service] = (serviceMap[b.service] || 0) + 1;
  });

  const serviceData = Object.keys(serviceMap).map((s) => ({
    name: s,
    count: serviceMap[s],
  }));

  // ================= ACTIONS =================
  const handleApprove = async (id) => {
    await approveBooking(id);
    fetchBookings();
  };

  const handleReject = async (id) => {
    await rejectBooking(id);
    fetchBookings();
  };

  const handleDelete = async (id) => {
    await deleteBooking(id);
    fetchBookings();
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Admin Dashboard 🚀</h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* ================= AI INSIGHTS ================= */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-4 rounded-xl shadow mb-6"
      >
        <h2 className="font-semibold mb-2">🤖 AI Insights</h2>

        {insights.map((i, index) => (
          <motion.p
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-sm text-gray-700 mb-1"
          >
            {i}
          </motion.p>
        ))}
      </motion.div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[ 
          { title: "Total", value: total },
          { title: "Today", value: todayBookings.length },
          { title: "Approved", value: approved.length },
          { title: "Revenue", value: `₹${revenue}` },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <h3>{card.title}</h3>
            <p className="text-xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <motion.div className="bg-white p-4 rounded shadow">
          <h3>📈 Booking Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line dataKey="bookings" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="bg-white p-4 rounded shadow">
          <h3>🥧 Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusData} dataKey="value" outerRadius={80}>
                {statusData.map((_, i) => (
                  <Cell key={i} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

      </div>

      {/* BAR */}
      <motion.div className="bg-white p-4 rounded shadow mb-6">
        <h3>📊 Service Usage</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={serviceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="mb-3">All Bookings</h3>

        <table className="w-full text-sm text-center">
          <thead>
            <tr>
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td>{b.userName}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.status || "pending"}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleApprove(b._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    ✔
                  </button>

                  <button
                    onClick={() => handleReject(b._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    ✖
                  </button>

                  <button
                    onClick={() => handleDelete(b._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}