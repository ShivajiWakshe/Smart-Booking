import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api"; // ✅ use api

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    try {
      setLoading(true);

      // ✅ API call (NO localhost)
      const res = await registerUser({ name, email, password });

      if (res.status === 200 || res.status === 201) {
        alert("Account created successfully ✅");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[360px]">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-2">
          Create Account 🚀
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Signup to get started
        </p>

        <input
          placeholder="Full Name"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 border rounded-lg mb-3"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {loading ? "Creating..." : "Signup"}
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}