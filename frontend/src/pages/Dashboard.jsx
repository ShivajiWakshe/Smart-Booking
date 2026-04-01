import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserBookings } from "../utils/api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  navigate("/login");
}

  // ✅ LOAD USER SAFELY
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login"); // 🔒 protect route
    } else {
      setUser(storedUser);
    }
  }, []);

  // ✅ FETCH BOOKINGS
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const res = await getUserBookings(user.email);
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [user]);

  // 📅 UPCOMING BOOKINGS
  const today = new Date().toISOString().split("T")[0];

  const upcoming = bookings.filter(
    (b) => b.date && b.date >= today
  );

  // 🔥 SERVICES
  const services = [
    { name: "Doctor Appointment", type: "doctor", icon: "🩺", desc: "Book doctor visits" },
    { name: "Lab Tests", type: "lab", icon: "🧪", desc: "Schedule lab tests" },
    { name: "Restaurant Booking", type: "restaurant", icon: "🍽️", desc: "Reserve tables" },
    { name: "Food Delivery", type: "food", icon: "🍕", desc: "Order food online" },
    { name: "Salon & Spa", type: "salon", icon: "💇", desc: "Beauty services" },
    { name: "Fitness Classes", type: "fitness", icon: "🏋️", desc: "Gym & yoga" },
    { name: "Hotel Booking", type: "hotel", icon: "🏨", desc: "Book hotel rooms" },
    { name: "Event Tickets", type: "event", icon: "🎫", desc: "Concert & movies" },
    { name: "Travel Booking", type: "travel", icon: "✈️", desc: "Flights & buses" },
    { name: "Home Services", type: "home", icon: "🏠", desc: "Electrician, plumber" },
    { name: "Online Courses", type: "education", icon: "📚", desc: "Learn new skills" },
    { name: "Car Rental", type: "car", icon: "🚗", desc: "Rent cars easily" },
  ];

  const filtered = services.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">

      {/* 🔥 HEADER */}
      <div className="bg-white shadow sticky top-0 z-50 px-6 py-4 flex justify-between items-center">

        <h1 className="text-lg font-bold text-blue-600">
          Welcome {user?.name} 👋
        </h1>

        <div className="flex gap-4 text-sm items-center">

          {/* NAV LINKS */}
          {[
            { name: "Profile", path: "/profile" },
            { name: "My Bookings", path: "/bookings" },
            { name: "About", path: "/about" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.path)}
              className="relative px-3 py-1 font-medium text-gray-700 group"
            >
              {btn.name}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </button>
          ))}

          {/* 🔥 ADMIN BUTTON (ONLY FOR ADMIN) */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin")}
              className="relative px-3 py-1 text-red-600 font-semibold group"
            >
              Admin Panel
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
            </button>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="relative px-3 py-1 text-red-500 group"
          >
            Logout
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-red-500 transition-all group-hover:w-full"></span>
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-grow p-6">

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="🔍 Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl border shadow focus:ring-2 focus:ring-blue-400"
        />

        {/* 📅 UPCOMING BOOKINGS */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="font-semibold mb-3">📅 Upcoming Bookings</h2>

          {upcoming.length === 0 ? (
            <p className="text-gray-500 text-sm">No bookings yet</p>
          ) : (
            <div className="space-y-2">
              {upcoming.slice(0, 3).map((b, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm font-semibold capitalize">
                      {b.service}
                    </p>
                    <p className="text-xs text-gray-500">
                      {b.item}
                    </p>
                    <p className="text-xs text-gray-400">
                      {b.date} • {b.time || b.slot}
                    </p>
                  </div>

                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {b.status || "pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🚀 SERVICES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {filtered.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition overflow-hidden"
            >
              <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl">
                {service.icon}
              </div>

              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold">{service.name}</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {service.desc}
                </p>

                <button
                  onClick={() => navigate(`/booking/${service.type}`)}
                  className="mt-4 w-full py-2 rounded-lg text-white text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:scale-105 transition"
                >
                  Book Now →
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-white border-t text-center py-3 text-sm text-gray-500">
        © 2026 Smart Booking System • Built by Shivaji Wakshe 🚀
      </div>
    </div>
  );
}