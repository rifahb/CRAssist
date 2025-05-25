import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext"; // Assuming you have context for auth
import axios from "axios";
import Layout from "../components/Layout";

export default function Profile() {
  const { user, logout } = useAuth();  // Custom hook to manage user data
  const [announcements, setAnnouncements] = useState([]);

  // Log out the user object to inspect its structure
  useEffect(() => {
    console.log("User data:", user); // This will help you debug if the user data is coming in correctly
  }, [user]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/announcements")
      .then((response) => setAnnouncements(response.data))
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  const handleLogout = () => {
    logout();  // Clear user session, redirect to login
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-gray-950 text-white px-6 py-10">
        {/* Background glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/30 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-2xl rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-4">Your Profile</h1>
            <p className="mb-2"><strong>Name:</strong> {user?.name || "Guest"}</p>
            <p className="mb-2"><strong>Email:</strong> {user?.email || "No email provided"}</p>
            <p className="mb-4"><strong>Role:</strong> {user?.role || "No role assigned"}</p>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 px-5 py-2 rounded-lg text-sm font-semibold text-white transition"
            >
              Logout
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-accent">Announcements</h2>
            {announcements.length > 0 ? (
              <ul className="space-y-4">
                {announcements.map((a) => (
                  <li key={a._id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-700">
                    <h3 className="text-lg font-semibold text-white">{a.title}</h3>
                    <p className="text-sm text-gray-300">{a.content}</p>
                    <small className="text-xs text-gray-500">{new Date(a.date).toLocaleString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No announcements at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
