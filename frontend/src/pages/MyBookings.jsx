import { useState, useEffect } from "react";
import { getUserBookings, deleteBooking } from "../utils/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ FETCH FROM MONGODB
  const fetchBookings = async () => {
    try {
      const res = await getUserBookings(user?.email);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ✅ CANCEL BOOKING (DELETE FROM DB)
  const cancelBooking = async (id) => {
    try {
      await deleteBooking(id);
      fetchBookings(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    if (status === "approved") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 text-blue-600">
        My Bookings 📋
      </h1>

      {/* EMPTY */}
      {bookings.length === 0 && (
        <div className="text-center mt-20 text-gray-500">
          <p>No bookings found 😔</p>
        </div>
      )}

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold capitalize text-lg">
                {b.service}
              </h2>

              <span
                className={`text-xs text-white px-2 py-1 rounded ${getStatusColor(
                  b.status
                )}`}
              >
                {b.status || "pending"}
              </span>
            </div>

            {/* DETAILS */}
            <div className="text-sm text-gray-600 space-y-1">
              <p><b>Item:</b> {b.item}</p>
              <p><b>Date:</b> {b.date}</p>
              <p><b>Time:</b> {b.time || b.slot}</p>
              <p><b>Location:</b> {b.location}</p>
            </div>

            {/* ACTION */}
            <button
              onClick={() => cancelBooking(b._id)}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
            >
              Cancel Booking ❌
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}