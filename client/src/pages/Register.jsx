import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
export default function Register() {
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess(false);

  if (!name || !usn || !dob || !email || !role) {
    return setError("All fields are required.");
  }

  try {
    const res = await axios.post("http://localhost:5001/api/auth/register", {
      name, usn, dob, email, role
    });
    setSuccess(true);
    setTimeout(() => navigate("/login"), 2000); // redirect after 2s
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  }
};

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-gray-950">
        {/* Glow Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/30 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-2xl rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Create an Account</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="USN"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={usn}
              onChange={(e) => setUsn(e.target.value)}
            />
            <input
              type="text"
              placeholder="Date of Birth(YYYY-MM-DD)"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select Role</option>
              <option value="student">Student</option>
              <option value="cr">CR</option>
              <option value="teacher">Teacher</option>
            </select>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">✅ Registered! Redirecting to login...</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition"
            >
              Register
            </button>

            <div className="text-xs text-gray-300 text-center mt-2">
              Already have an account? <a href="/login" className="underline">Login</a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
