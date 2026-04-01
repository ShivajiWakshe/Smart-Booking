import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User Dashboard */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Login />}
        />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? <Admin /> : <Login />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;