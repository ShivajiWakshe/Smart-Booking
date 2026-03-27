import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handlePayment = () => {
    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push(state);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("✅ Payment Successful & Booking Confirmed!");

    navigate("/bookings");
  };

  return (
    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">
        💳 Order Summary
      </h1>

      <div className="bg-white p-4 shadow rounded">

        <p><b>Service:</b> {state.service}</p>
        <p><b>Item:</b> {state.item}</p>
        <p><b>Date:</b> {state.date}</p>
        <p><b>Time:</b> {state.time || state.slot}</p>
        <p><b>Price:</b> ₹{state.price || 500}</p>

        <button
          onClick={handlePayment}
          className="bg-green-500 text-white w-full mt-4 p-2 rounded"
        >
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}