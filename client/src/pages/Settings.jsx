// src/pages/Settings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/authContext";
import axios from "axios";

export default function Settings() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(res.data.email);
        setDob(res.data.dob);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5001/api/users/me",
        { email, dob, language, darkMode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDob = prompt("Please enter your DOB (YYYY-MM-DD) to confirm:");
    if (!confirmDob) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete("http://localhost:5001/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
        data: { dob: confirmDob },
      });
      alert("✅ Account deleted.");
      logout();
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Error deleting account.");
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-950 px-6 py-10 text-white">
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 space-y-6">

          <h1 className="text-2xl font-bold text-primary text-center">Settings</h1>

          <div className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            />

            <input
              type="text"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            />

            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Kannada</option>
            </select>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handleDeleteAccount}
              className="text-red-500 hover:underline text-sm"
            >
              Delete Account
            </button>

            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white text-sm font-semibold"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {message && <p className="text-center text-sm text-green-400">{message}</p>}
        </div>
      </div>
    </Layout>
  );
}
