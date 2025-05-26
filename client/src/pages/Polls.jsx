import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch polls
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/polls", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPolls(res.data);
      } catch (err) {
        setError("Failed to load polls");
        console.error("Polls fetch error:", err);
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
        `http://localhost:5000/api/polls/${pollId}/vote`,
        { optionIndex },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPolls(polls =>
        polls.map(p => (p._id === pollId ? res.data : p))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Vote failed");
      console.error("Vote error:", err);
    }
    setLoading(false);
  };

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

  function getUsnFromToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return "";
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.usn;
    } catch {
      return "";
    }
  }

  const userUsn = getUsnFromToken();

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Polls</h1>
        {/* Show Create Poll button only for CRs */}
        {(getRoleFromToken() === "cr"|| getRoleFromToken() === "teacher") && (
          <Link to="/polls/create" className="bg-indigo-600 px-4 py-2 rounded font-semibold mb-4 inline-block">
            Create Poll
          </Link>
        )}
        {error && <div className="text-red-400 mb-4">{error}</div>}
        {polls.map(poll => {
          // Defensive: ensure poll.voters is an array
          const voters = Array.isArray(poll.voters) ? poll.voters : [];
          const hasVoted = voters.includes(userUsn);

          // Debug log for poll
          console.log("Poll:", poll.question, "User USN:", userUsn, "Voters:", voters, "Has voted:", hasVoted);

          return (
            <div key={poll._id} className="mb-8 p-6 bg-zinc-900 rounded-xl shadow">
              <div className="font-semibold mb-2">{poll.question}</div>
              <div>
                {poll.options.map((opt, idx) => {
                  // Debug log for loading state and button
                  console.log("Option:", opt.text, "loading:", loading, "hasVoted:", hasVoted, "userUsn:", userUsn);
                  return (
                    <div key={idx} className="flex items-center gap-2 mb-1">
                     <button
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-2 rounded-lg font-semibold text-white hover:opacity-90 transition"
            disabled={hasVoted || loading}
              onClick={() => handleVote(poll._id, idx)}
>
                        {opt.text}
                      </button>
                      <span className="ml-2 text-xs text-gray-400">
                        {opt.votes} votes
                      </span>
                    </div>
                  );
                })}
              </div>
              {hasVoted && (
                <div className="text-green-400 text-xs mt-2">You have already voted in this poll.</div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                Total votes: {poll.options.reduce((a, b) => a + b.votes, 0)}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}