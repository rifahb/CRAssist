import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";

export default function MyIssues() {
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/issues/my", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIssues(res.data);
      } catch (err) {
        setError("Failed to load your issues");
      }
    };
    fetchIssues();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Issues</h1>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="space-y-4">
          {issues.length === 0 && (
            <div className="text-gray-400">You have not submitted any issues yet.</div>
          )}
          {issues.map(issue => (
            <div key={issue._id} className="p-4 bg-zinc-900 rounded-lg shadow">
              <div className="font-semibold">{issue.title}</div>
              <div className="text-gray-300 mt-1">{issue.description}</div>
              <div className="text-xs text-gray-500 mt-1">
                Status: {issue.status} | {new Date(issue.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}