import React, { useState } from "react";
import Layout from "../components/Layout";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [email, setEmail] = useState("you@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [visibility, setVisibility] = useState("public");
  const [language, setLanguage] = useState("English");

  const handleDownloadData = () => {
    alert("Downloading your data...");
    // Implement the actual data download functionality here
  };

  const handleDeleteAccount = () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmation) {
      alert("Account deleted successfully!");
      // Implement the actual account deletion functionality here
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-gray-950 text-white px-6 py-10">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/30 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-2xl rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 space-y-8">
          <h1 className="text-3xl font-bold text-primary">Settings</h1>

          {/* Account Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Account</h2>
            <label className="block">
              <span className="text-gray-300">Email</span>
              <input
                type="email"
                className="mt-1 block w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="block">
              <span className="text-gray-300">Password</span>
              <input
                type="password"
                className="mt-1 block w-full bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Preferences</h2>
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Enable Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
            </label>

            <label className="flex items-center justify-between">
              <span className="text-gray-300">Enable Notifications</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="form-checkbox h-5 w-5 text-purple-600"
              />
            </label>
          </div>

          {/* Manage Visibility */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Manage Visibility</h2>
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Profile Visibility</span>
              <select
                className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </label>
          </div>

          {/* Download Data */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Download Data</h2>
            <p className="text-gray-300">Download your user data in a structured format.</p>
            <button
              onClick={handleDownloadData}
              className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
            >
              Download My Data
            </button>
          </div>

          {/* Language Settings */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-accent">Language</h2>
            <label className="flex items-center justify-between">
              <span className="text-gray-300">Select Language</span>
              <select
                className="bg-zinc-800 text-white border border-zinc-700 rounded px-3 py-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </label>
          </div>

          {/* Delete Account Section */}
          <div className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold text-red-600">Delete Account</h2>
            <p className="text-gray-300">
              This action will permanently delete your account and all related data. Please proceed with caution.
            </p>
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Delete My Account
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
