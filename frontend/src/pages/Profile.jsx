import { useState } from "react";
import { motion } from "framer-motion";

export default function Profile() {
  const savedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(savedUser);
  const [edit, setEdit] = useState(false);

  const stats = [
    { label: "Bookings", value: 12 },
    { label: "Approved", value: 8 },
    { label: "Pending", value: 4 },
  ];

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEdit(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setUser({ ...user, avatar: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center">

      <motion.div
        initial={{ rotateY: 180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white p-6 rounded-2xl shadow-xl w-96 text-center"
      >

        {/* Avatar */}
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={user?.avatar || "https://via.placeholder.com/150"}
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />

        {edit && (
          <input type="file" onChange={handleImage} className="mt-2" />
        )}

        {/* Name + Email */}
        {edit ? (
          <>
            <input
              className="border p-2 w-full mt-3"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
            />
            <input
              className="border p-2 w-full mt-2"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <button
              onClick={handleSave}
              className="bg-green-500 text-white w-full mt-3 p-2 rounded"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mt-3">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>

            <button
              onClick={() => setEdit(true)}
              className="bg-blue-500 text-white w-full mt-3 p-2 rounded"
            >
              Edit Profile
            </button>
          </>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="bg-blue-100 p-3 rounded-lg"
            >
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}