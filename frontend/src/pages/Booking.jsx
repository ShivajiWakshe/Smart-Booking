import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createBooking } from "../utils/api";

const Booking = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("Mumbai");
  const [success, setSuccess] = useState(false);

  // ✅ 12 SERVICES (5 OPTIONS EACH)
  const servicesData = {
    doctor: [
      { name: "Dr. Sharma", details: "Cardiologist • 10 yrs", price: "₹500", rating: "4.6", img: "https://images.pexels.com/photos/8460157/pexels-photo-8460157.jpeg" },
      { name: "Dr. Mehta", details: "Dermatologist • 8 yrs", price: "₹400", rating: "4.5", img: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg" },
      { name: "Dr. Patel", details: "Orthopedic • 12 yrs", price: "₹600", rating: "4.7", img: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg" },
      { name: "Dr. Khan", details: "Neurologist • 9 yrs", price: "₹700", rating: "4.8", img: "https://images.pexels.com/photos/6749779/pexels-photo-6749779.jpeg" },
      { name: "Dr. Rao", details: "General Physician • 6 yrs", price: "₹300", rating: "4.4", img: "https://images.pexels.com/photos/8376233/pexels-photo-8376233.jpeg" },
    ],

    lab: [
      { name: "Full Body Checkup", details: "Blood + Urine", price: "₹999", rating: "4.7", img: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg" },
      { name: "Blood Test", details: "Basic Blood", price: "₹299", rating: "4.5", img: "https://images.pexels.com/photos/5722164/pexels-photo-5722164.jpeg" },
      { name: "Diabetes Test", details: "Sugar Test", price: "₹399", rating: "4.6", img: "https://images.pexels.com/photos/8460153/pexels-photo-8460153.jpeg" },
      { name: "Thyroid Test", details: "Hormone Test", price: "₹499", rating: "4.5", img: "https://images.pexels.com/photos/8460154/pexels-photo-8460154.jpeg" },
      { name: "Vitamin Test", details: "Vitamin Levels", price: "₹699", rating: "4.6", img: "https://images.pexels.com/photos/8460156/pexels-photo-8460156.jpeg" },
    ],

    restaurant: [
      { name: "Luxury Dining", details: "5-Star Dining", price: "₹1500", rating: "4.6", img: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" },
      { name: "Cafe Delight", details: "Casual Cafe", price: "₹800", rating: "4.5", img: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg" },
      { name: "Spice Hub", details: "Indian Cuisine", price: "₹1200", rating: "4.7", img: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" },
      { name: "Sea View", details: "Sea Facing", price: "₹2000", rating: "4.8", img: "https://images.pexels.com/photos/460537/pexels-photo-460537.jpeg" },
      { name: "Urban Eatery", details: "Modern Food", price: "₹900", rating: "4.4", img: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg" },
    ],

    food: [
      { name: "Burger", details: "Fast Food", price: "₹150", rating: "4.5", img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" },
      { name: "Pizza", details: "Italian", price: "₹250", rating: "4.7", img: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg" },
      { name: "Biryani", details: "Indian Special", price: "₹200", rating: "4.6", img: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" },
      { name: "Pasta", details: "Creamy Pasta", price: "₹220", rating: "4.4", img: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg" },
      { name: "Drinks", details: "Beverages", price: "₹100", rating: "4.3", img: "https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg" },
    ],

    salon: [
      { name: "Haircut", details: "Men & Women", price: "₹200", rating: "4.5", img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg" },
      { name: "Facial", details: "Skin Care", price: "₹500", rating: "4.6", img: "https://images.pexels.com/photos/3985335/pexels-photo-3985335.jpeg" },
      { name: "Spa", details: "Relaxation", price: "₹1000", rating: "4.7", img: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg" },
      { name: "Massage", details: "Full Body", price: "₹800", rating: "4.6", img: "https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg" },
      { name: "Manicure", details: "Hand Care", price: "₹300", rating: "4.4", img: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg" },
    ],

    fitness: [
      { name: "Yoga", details: "Morning Yoga", price: "₹500", rating: "4.6", img: "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg" },
      { name: "Gym", details: "Workout", price: "₹800", rating: "4.5", img: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg" },
      { name: "Zumba", details: "Dance Fitness", price: "₹600", rating: "4.7", img: "https://images.pexels.com/photos/3775566/pexels-photo-3775566.jpeg" },
      { name: "CrossFit", details: "Strength", price: "₹900", rating: "4.6", img: "https://images.pexels.com/photos/28080/pexels-photo.jpg" },
      { name: "Trainer", details: "Personal Coach", price: "₹1200", rating: "4.8", img: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg" },
    ],

    hotel: [
      { name: "Deluxe Room", details: "Comfort Stay", price: "₹3000", rating: "4.5", img: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg" },
      { name: "Suite Room", details: "Premium", price: "₹5000", rating: "4.7", img: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg" },
      { name: "Standard Room", details: "Budget", price: "₹2000", rating: "4.4", img: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg" },
      { name: "Luxury Suite", details: "5-Star", price: "₹8000", rating: "4.8", img: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg" },
      { name: "Budget Room", details: "Affordable", price: "₹1500", rating: "4.2", img: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg" },
    ],

    event: [
      { name: "Movie", details: "Cinema Ticket", price: "₹200", rating: "4.5", img: "https://images.pexels.com/photos/799137/pexels-photo-799137.jpeg" },
      { name: "Concert", details: "Live Music", price: "₹1500", rating: "4.8", img: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg" },
      { name: "Sports", details: "Match Ticket", price: "₹800", rating: "4.6", img: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg" },
      { name: "Comedy", details: "Standup", price: "₹600", rating: "4.7", img: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg" },
      { name: "Theatre", details: "Drama", price: "₹500", rating: "4.5", img: "https://images.pexels.com/photos/713152/pexels-photo-713152.jpeg" },
    ],

    travel: [
      { name: "Flight", details: "Air Travel", price: "₹5000", rating: "4.6", img: "https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg" },
      { name: "Bus", details: "Sleeper", price: "₹800", rating: "4.4", img: "https://images.pexels.com/photos/21014/pexels-photo.jpg" },
      { name: "Train", details: "Express", price: "₹600", rating: "4.5", img: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg" },
      { name: "Tour", details: "Holiday Package", price: "₹15000", rating: "4.7", img: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg" },
      { name: "Cruise", details: "Luxury Travel", price: "₹20000", rating: "4.8", img: "https://images.pexels.com/photos/1007836/pexels-photo-1007836.jpeg" },
    ],

    home: [
      { name: "Electrician", details: "Repair", price: "₹300", rating: "4.5", img: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg" },
      { name: "Plumber", details: "Fix Pipes", price: "₹400", rating: "4.6", img: "https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg" },
      { name: "Cleaning", details: "Home Clean", price: "₹800", rating: "4.7", img: "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg" },
      { name: "Painting", details: "Wall Paint", price: "₹1500", rating: "4.4", img: "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg" },
      { name: "AC Repair", details: "Cooling Fix", price: "₹700", rating: "4.6", img: "https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg" },
    ],

    education: [
      { name: "Web Dev", details: "HTML CSS JS", price: "₹2000", rating: "4.7", img: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg" },
      { name: "Java Course", details: "Core Java", price: "₹2500", rating: "4.6", img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg" },
      { name: "Python", details: "Beginner", price: "₹1800", rating: "4.5", img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg" },
      { name: "React", details: "Frontend", price: "₹3000", rating: "4.8", img: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg" },
      { name: "DSA", details: "Interview Prep", price: "₹3500", rating: "4.9", img: "https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg" },
    ],

    car: [
      { name: "Bike", details: "2 Wheeler", price: "₹300", rating: "4.5", img: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg" },
      { name: "Sedan", details: "Comfort Car", price: "₹1200", rating: "4.6", img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg" },
      { name: "SUV", details: "Family Car", price: "₹2000", rating: "4.7", img: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg" },
      { name: "Luxury", details: "Premium Ride", price: "₹5000", rating: "4.8", img: "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg" },
      { name: "Mini", details: "Budget Car", price: "₹800", rating: "4.4", img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg" },
    ],
  };

  const handleBooking = async () => {
    if (!selected || !date) return alert("Select service & date");

    const booking = {
      userName: user?.name,
      userEmail: user?.email,
      service: type,
      item: selected.name,
      date,
      time,
      location,
    };

    await createBooking(booking);

    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500">
        ← Back
      </button>

      <h1 className="text-xl font-bold mb-4 capitalize">{type} Booking</h1>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 w-full mb-4"
      >
        <option>Mumbai</option>
        <option>Pune</option>
        <option>Delhi</option>
      </select>

      <div className="grid md:grid-cols-3 gap-5">
        {servicesData[type]?.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(item)}
            className={`border rounded-xl overflow-hidden cursor-pointer ${
              selected?.name === item.name ? "border-blue-500" : ""
            }`}
          >
            <img src={item.img} className="h-40 w-full object-cover" />

            <div className="p-3">
              <h3 className="font-semibold">{item.name}</h3>
              <p>{item.details}</p>
              <p>⭐ {item.rating}</p>
              <p>💰 {item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <input
        type="date"
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full mt-4"
      />
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
        className="border p-2 w-full mt-2"
      />

      <button
        onClick={handleBooking}
        className="mt-5 w-full bg-blue-600 text-white py-2 rounded"
      >
        Confirm Booking
      </button>

      {success && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded">
          ✅ Booking Saved to Database
        </div>
      )}
    </div>
  );
};

export default Booking;