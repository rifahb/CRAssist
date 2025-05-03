import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext"; // Custom hook to manage user data

export default function Layout({ children }) {
  const { user, logout } = useAuth(); // Custom hook to manage user data
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Pages with minimal navbar
  const isMinimalNavbar = ["/login", "/register", "/forgot-password", "/help", "/about"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 text-white">
      {/* Header/Navbar */}
      <header className="backdrop-blur-md bg-black/60 border-b border-zinc-700 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">CRAssist</h1>

          {/* Full Navbar */}
          {!isMinimalNavbar && (
            <nav className="flex items-center gap-6 text-sm">
              <Link
                to="/dashboard"
                className={`hover:text-accent ${
                  location.pathname === "/dashboard" ? "text-accent" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/issue"
                className={`hover:text-accent ${
                  location.pathname === "/issue" ? "text-accent" : ""
                }`}
              >
                Issue
              </Link>
              <Link
                to="/feedback"
                className={`hover:text-accent ${
                  location.pathname === "/feedback" ? "text-accent" : ""
                }`}
              >
                Feedback
              </Link>
              <Link
                to="/polls"
                className={`hover:text-accent ${
                  location.pathname === "/polls" ? "text-accent" : ""
                }`}
              >
                Polls
              </Link>
              {user && (
                <Link
                  to="/settings"
                  className={`hover:text-accent ${
                    location.pathname === "/settings" ? "text-accent" : ""
                  }`}
                >
                  Settings
                </Link>
              )}
            </nav>
          )}

          {/* Minimal Navbar for login, help, about, etc. */}
          {isMinimalNavbar && (
            <div className="flex gap-4 text-sm">
              {location.pathname !== "/help" && (
                <Link to="/help" className="hover:underline">
                  Help
                </Link>
              )}
              {location.pathname !== "/about" && (
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              )}
              <button
                onClick={toggleDarkMode}
                className="ml-4 px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 transition text-xs"
              >
                {darkMode ? "☀ Light" : "🌙 Dark"}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="p-4">{children}</main>
    </div>
  );
}
