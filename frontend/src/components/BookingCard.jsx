import React from "react";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booking/${service.type}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition cursor-pointer">
      <img src={service.image} alt={service.name} className="w-16 mx-auto" />

      <h2 className="text-lg font-semibold text-center mt-2">
        {service.name}
      </h2>

      <p className="text-gray-500 text-sm text-center">
        {service.description}
      </p>

      <button
        onClick={handleClick}
        className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
};

export default BookingCard;