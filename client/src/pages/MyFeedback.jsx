import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

// Simple bin and pen icons
const BinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const PenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13z" />
  </svg>
);

export default function MyFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editFeedback, setEditFeedback] = useState("");

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, []);

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

  const handleEdit = (fb) => {
    setEditingId(fb._id);
    setEditFeedback(fb.feedback);
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/feedback/${id}`,
        { feedback: editFeedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditFeedback("");
      fetchFeedbacks();
    } catch {
      setError("Failed to update feedback");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedbacks(feedbacks.filter(fb => fb._id !== id));
    } catch {
      setError("Failed to delete feedback");
    }
  };

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
            <div key={fb._id} className="p-4 bg-zinc-900 rounded-lg shadow flex justify-between items-start">
              {editingId === fb._id ? (
                <div className="flex-1">
                  <textarea
                    className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
                    value={editFeedback}
                    onChange={e => setEditFeedback(e.target.value)}
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 px-3 py-1 rounded text-white"
                      onClick={() => handleUpdate(fb._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 px-3 py-1 rounded text-white"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <div className="text-gray-300">{fb.feedback}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(fb.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      className="bg-yellow-600 px-2 py-1 rounded text-white flex items-center gap-1"
                      onClick={() => handleEdit(fb)}
                      title="Edit"
                    >
                      <PenIcon />
                    </button>
                    <button
                      className="bg-red-600 px-2 py-1 rounded text-white flex items-center gap-1"
                      onClick={() => handleDelete(fb._id)}
                      title="Delete"
                    >
                      <BinIcon />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}