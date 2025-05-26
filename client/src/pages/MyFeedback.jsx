import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/feedback/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFeedbacks(res.data);
      } catch (err) {
        setError("Failed to load your feedbacks");
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Feedback</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="space-y-4">
          {feedbacks.length === 0 && (
            <div className="text-gray-400">You have not submitted any feedback yet.</div>
          )}
          {feedbacks.map(fb => (
            <div key={fb._id} className="p-4 bg-zinc-900 rounded-lg shadow">
              <div className="text-gray-300">{fb.feedback}</div>
              <div className="text-xs text-gray-500 mt-1">{new Date(fb.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}