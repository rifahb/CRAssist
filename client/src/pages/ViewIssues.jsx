import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

export default function ViewIssues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5001/api/issues", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIssues(res.data);
      } catch (err) {
        console.error("Failed to fetch issues", err);
      }
    };

    fetchIssues();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white py-10 px-6">
        <h2 className="text-3xl font-bold mb-6">All Submitted Issues</h2>
        <div className="grid gap-4">
          {issues.length === 0 ? (
            <p>No issues submitted yet.</p>
          ) : (
            issues.map((issue) => (
              <div key={issue._id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <h3 className="font-semibold text-lg">{issue.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{issue.description}</p>
                <p className="text-sm text-indigo-300">USN: {issue.usn}</p>
                <p className="text-xs text-gray-500">{new Date(issue.date).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
