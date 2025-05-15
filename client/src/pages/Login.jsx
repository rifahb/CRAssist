import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

import { useAuth } from "../context/authContext"; // ✅ Import context
import axios from "axios"; // Import axios
export default function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
   const [usn, setUsn] = useState(""); // Change email to USN
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
   if (!usn || !dob) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

  try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        usn,
        dob, // Send usn and dob to the backend
      });

      if (response.data.token) {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem("token", response.data.token);

        // Set user info in context
        login(usn);

        // Navigate to the profile or dashboard
        navigate("/profile");
      }
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center relative overflow-hidden bg-gray-950">
        {/* Rays / glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-indigo-500/30 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-2xl rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Card */}
        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Welcome to CRAssist</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 text-sm font-medium text-white" htmlFor="email">Email</label>
              <input
                id="usn"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-white" htmlFor="password">Password</label>
              <input
                 id="dob"
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your birthdate (YYYY-MM-DD)"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            {error && <div className="text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <div className="flex justify-between text-xs mt-2 text-gray-300">
  <a href="/forgot-password" className="hover:underline">Forgot password?</a>
  <Link to="/register" className="hover:underline">Create account</Link>
</div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
