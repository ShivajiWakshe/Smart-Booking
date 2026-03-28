import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user")); // Optional: logged-in info

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-blue-600">Welcome 👋</h1>
        <nav>
          {user ? (
            <>
              <span>{user.name}</span> | <Link to="/dashboard">My Bookings</Link> | <Link to="/login">Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 mr-2">Login</Link>
              <Link to="/signup" className="text-green-600">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-xl mb-2">Doctor Appointment 🩺</h2>
          <p>Book doctor visits</p>
          <Link to="/dashboard" className="mt-2 inline-block text-blue-600 hover:underline">Book Now →</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-xl mb-2">Lab Tests 🧪</h2>
          <p>Schedule lab tests</p>
          <Link to="/dashboard" className="mt-2 inline-block text-blue-600 hover:underline">Book Now →</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-bold text-xl mb-2">Restaurant Booking 🍽️</h2>
          <p>Reserve tables</p>
          <Link to="/dashboard" className="mt-2 inline-block text-blue-600 hover:underline">Book Now →</Link>
        </div>

        {/* Add more services similarly */}
      </section>

      <footer className="mt-12 text-center text-gray-400">
        © 2026 Smart Booking System • Built by Shivaji Wakshe 🚀
      </footer>
    </div>
  );
}