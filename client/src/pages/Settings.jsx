// src/pages/Settings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Settings() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("user@example.com");
  const [dob, setDob] = useState("01/01/1990");
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("English");
  const [message, setMessage] = useState("");
  const [accountDeleted, setAccountDeleted] = useState(false);

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmDelete) return;

    if (dob === "01/01/1990") {
      setAccountDeleted(true);
      setMessage("Your account has been deleted.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      setMessage("Please enter correct DOB to confirm deletion.");
    }
  };

  const handleSave = () => {
    setMessage("Your preferences have been saved.");
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gray-950 text-white px-6 py-10 relative">
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur border border-white/10 rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-primary">User Settings</h1>

          {/* Account Info */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Account Information</h2>
            <label className="block">
              <span className="text-gray-300">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Date of Birth</span>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                min="1900-01-01"
                max="2025-12-31"
                className="mt-1 w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              />
            </label>
          </section>

          {/* Preferences */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Preferences</h2>
            <label className="flex justify-between items-center">
              <span className="text-gray-300">Enable Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
            </label>

            <label className="flex justify-between items-center">
              <span className="text-gray-300">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </label>
          </section>

          {/* Delete Account */}
          <section className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
            <p className="text-gray-400 text-sm">
              For mock deletion, DOB must be <code>1990-01-01</code>. This simulates a deletion flow.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded text-white font-semibold transition"
              disabled={accountDeleted}
            >
              {accountDeleted ? "Account Deleted" : "Delete My Account"}
            </button>
          </section>

          {/* Save Settings */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
            >
              Save Changes
            </button>
          </div>

          {/* Feedback Message */}
          {message && (
            <div className="mt-4 text-center text-green-400 font-medium">
              {message}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
