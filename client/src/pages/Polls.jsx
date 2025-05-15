import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch polls
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/polls", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPolls(res.data);
      } catch (err) {
        setError("Failed to load polls");
      }
    };
    fetchPolls();
  }, []);

  // Vote handler
  const handleVote = async (pollId, optionIndex) => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `/api/polls/${pollId}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls(polls =>
        polls.map(p => (p._id === pollId ? res.data : p))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Vote failed");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Polls</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {polls.map(poll => (
          <div key={poll._id} className="mb-8 p-6 bg-zinc-900 rounded-xl shadow">
            <div className="font-semibold mb-2">{poll.question}</div>
            <div>
              {poll.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-1">
                  <button
                    disabled={poll.voters.includes(JSON.parse(atob(localStorage.getItem("token").split('.')[1])).usn)}
                    onClick={() => handleVote(poll._id, idx)}
                    className="accent-primary"
                  >
                    {opt.text}
                  </button>
                  <span className="ml-2 text-xs text-gray-400">
                    {opt.votes} votes
                  </span>
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Total votes: {poll.options.reduce((a, b) => a + b.votes, 0)}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}