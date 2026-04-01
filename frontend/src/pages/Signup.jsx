import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({});

  const handleSignup = async () => {
    try {
      await signupUser(form);
      alert("Signup success ✅");
      navigate("/login");
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-200">
      <div className="bg-white p-6 rounded shadow w-80">
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full mb-2 p-2 border"/>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full mb-2 p-2 border"/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} className="w-full mb-2 p-2 border"/>

        <button onClick={handleSignup} className="w-full bg-green-600 text-white p-2">
          Signup
        </button>
      </div>
    </div>
  );
}