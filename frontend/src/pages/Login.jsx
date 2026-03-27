import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message || "Login failed ❌");
      }
    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-[360px]">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Welcome Back 👋
        </h2>

        <input
          placeholder="Email"
          className="w-full p-3 border rounded-lg mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded-lg mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Login
        </button>

        {/* Admin Quick Login */}
        <button
          onClick={() => {
            setEmail("admin@gmail.com");
            setPassword("admin123");
          }}
          className="w-full mt-3 text-red-600 hover:underline text-sm"
        >
          Login as Admin
        </button>

        <p className="text-center mt-4 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}