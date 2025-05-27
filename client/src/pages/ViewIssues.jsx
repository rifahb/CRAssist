// import { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "../components/Layout";

// export default function ViewIssues() {
//   const [issues, setIssues] = useState([]);

//   useEffect(() => {
//     const fetchIssues = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5001/api/issues", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setIssues(res.data);
//       } catch (err) {
//         console.error("Failed to fetch issues", err);
//       }
//     };

//     fetchIssues();
//   }, []);

//   return (
//     <Layout>
//       <div className="min-h-screen bg-zinc-950 text-white py-10 px-6">
//         <h2 className="text-3xl font-bold mb-6">All Submitted Issues</h2>
//         <div className="grid gap-4">
//           {issues.length === 0 ? (
//             <p>No issues submitted yet.</p>
//           ) : (
//             issues.map((issue) => (
//               <div key={issue._id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
//                 <h3 className="font-semibold text-lg">{issue.title}</h3>
//                 <p className="text-sm text-gray-400 mb-2">{issue.description}</p>
//                 <p className="text-sm text-indigo-300">USN: {issue.usn}</p>
//                   Status: {issue.status} | {new Date(issue.date).toLocaleString()}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

// Simple SVG icons
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

export default function ViewIssues() {
  const [issues, setIssues] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIssues();
    // eslint-disable-next-line
  }, []);

  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/issues", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIssues(res.data);
    } catch (err) {
      setError("Failed to fetch issues");
    }
  };

  const handleEdit = (issue) => {
    setEditingId(issue._id);
    setEditTitle(issue.title);
    setEditDescription(issue.description);
    setEditStatus(issue.status);
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/issues/${id}`,
        { title: editTitle, description: editDescription, status: editStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditTitle("");
      setEditDescription("");
      setEditStatus("");
      fetchIssues();
    } catch {
      setError("Failed to update issue");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this issue?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/issues/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIssues(issues.filter(issue => issue._id !== id));
    } catch {
      setError("Failed to delete issue");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 text-white py-10 px-6">
        <h2 className="text-3xl font-bold mb-6">All Submitted Issues</h2>
        {error && <div className="text-red-400 mb-4">{error}</div>}
        <div className="grid gap-4">
          {issues.length === 0 ? (
            <p>No issues submitted yet.</p>
          ) : (
            issues.map((issue) => (
              <div key={issue._id} className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
               {editingId === issue._id ? (
  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
    <input
      className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
      value={editTitle}
      onChange={e => setEditTitle(e.target.value)}
      placeholder="Title"
    />
    <textarea
      className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
      value={editDescription}
      onChange={e => setEditDescription(e.target.value)}
      placeholder="Description"
      rows={3}
    />
    <select
      className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 focus:ring-2 focus:ring-indigo-500"
      value={editStatus}
      onChange={e => setEditStatus(e.target.value)}
    >
      <option value="open">Open</option>
      <option value="resolved">Resolved</option>
    </select>
    <div className="flex gap-2">
      <button
        className="bg-green-600 px-3 py-1 rounded text-white flex items-center gap-1"
        onClick={() => handleUpdate(issue._id)}
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
  // ...existing code...
                  <>
                    <h3 className="font-semibold text-lg">{issue.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{issue.description}</p>
                    <p className="text-sm text-indigo-300">USN: {issue.usn}</p>
                    <div className="text-xs text-gray-500 mb-2">
                      Status: {issue.status} | {new Date(issue.date).toLocaleString()}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="bg-yellow-600 px-3 py-1 rounded text-white flex items-center gap-1"
                        onClick={() => handleEdit(issue)}
                      >
                        <PenIcon />
                      </button>
                      <button
                        className="bg-red-600 px-3 py-1 rounded text-white flex items-center gap-1"
                        onClick={() => handleDelete(issue._id)}
                      >
                        <BinIcon />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}