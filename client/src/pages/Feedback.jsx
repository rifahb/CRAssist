import { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Feedback() {
   const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");
 const navigate = useNavigate();
  function getRoleFromToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch {
      return null;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/feedback",
        { feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Feedback submitted! Thank you.");
      setFeedback("");
    } catch (err) {
      setMessage("Failed to submit feedback.");
    }
  };
  return (
    <Layout>
      <div className="min-h-screen relative bg-zinc-950">
        {/* Background with subtle glassmorphism effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-white relative z-10 px-6 py-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Submit Feedback</h1>
           {getRoleFromToken() === "cr" && (
            <button
              className="mb-4 bg-indigo-600 px-4 py-2 rounded font-semibold text-white hover:bg-indigo-700 transition"
              onClick={() => navigate("/viewfeedback")}
            >
              View Feedbacks
            </button>
          )}
          <form className="space-y-4 max-w-xl" onSubmit={handleSubmit}>
            <textarea
              rows="6"
              placeholder="Write your feedback here..."
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 backdrop-blur-md border border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
              value={feedback}
    onChange={(e) => setFeedback(e.target.value)}
    required
           ></textarea>
            <button className="bg-primary hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold">
              Submit
            </button>
              {message && <p className="text-green-400 mt-2">{message}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
}
