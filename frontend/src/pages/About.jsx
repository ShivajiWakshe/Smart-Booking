export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-xl shadow mb-6">
        <h1 className="text-3xl font-bold">
          Smart Booking System 🚀
        </h1>
        <p className="mt-2">
          Book everything in one place — fast, simple & smart
        </p>
      </div>

      {/* FEATURES */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        {[
          "Doctor Booking 🩺",
          "Food Delivery 🍕",
          "Hotel Booking 🏨",
          "Events 🎫",
          "Fitness 🏋️",
          "Salon 💇"
        ].map((f, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow hover:scale-105 transition text-center"
          >
            {f}
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">
          ⚡ How It Works
        </h2>

        <p className="text-gray-600">
          Select service → Choose option → Pick slot → Confirm booking.
        </p>
      </div>

      {/* IMAGE */}
      <img
        src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
        className="rounded-xl shadow"
      />

    </div>
  );
}