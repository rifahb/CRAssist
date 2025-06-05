// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [announcements, setAnnouncements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [myIssues, setMyIssues] = useState([]);
//   const [myFeedback, setMyFeedback] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [file, setFile] = useState(null);
//   const [announceMsg, setAnnounceMsg] = useState("");
//   const navigate = useNavigate();

//    async function fetchAnnouncements() {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5001/api/announcements");
//       setAnnouncements(res.data);
//     } catch {
//       setAnnouncements([]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     fetchAnnouncements();
//   }, [])
//   function handleLogout() {
//     localStorage.removeItem("token");
//     navigate("/login");
//   }

//   // Announcement form submit handler
//   async function handleAnnouncementSubmit(e) {
//     e.preventDefault();
//     setAnnounceMsg("");
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", content);
//     if (file) formData.append("file", file);

//     try {
//       await axios.post("http://localhost:5001/api/announcements", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setTitle("");
//       setContent("");
//       setFile(null);
//       setAnnounceMsg("Announcement posted!");
//       fetchAnnouncements();
//     } catch(err) {
//       setAnnounceMsg("Posted announcement.");
//         console.error("Announcement error:", err);
//     }
//   }

//   useEffect(() => {
//   async function fetchUserData() {
//     try {
//       const res = await axios.get("http://localhost:5001/api/users/me/data", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log("User data from API:", res.data);
//       const sortedIssues = res.data.issues
//         .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .slice(0, 2);
//       const sortedFeedback = res.data.feedback
//         .sort((a, b) => new Date(b.date) - new Date(a.date))
//         .slice(0, 2);

//       setMyIssues(sortedIssues);
//       setMyFeedback(sortedFeedback);
//     } catch (err) {
//       console.error("Failed to fetch user data:", err);
//       setMyIssues([]);
//       setMyFeedback([]);
//     }
//   }
//   fetchUserData();
// }, []);

//   return (
//     <Layout>
//       <div className="min-h-screen relative bg-zinc-950">
//         {/* Background */}
//         <div className="absolute inset-0 z-0">
//           <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
//           <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full opacity-25 animate-pulse"></div>
//           <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
//         </div>

//         {/* Content */}
//         <div className="px-6 py-8 relative z-10">
//           <h1 className="text-4xl font-bold text-primary mb-4">Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 px-7 py-3 rounded-lg text-base font-semibold text-white transition mt-2 mb-6"
//           >
//             Logout
//           </button>

//           {/* Announcement Form */}
//           <form className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md mb-8" onSubmit={handleAnnouncementSubmit}>
//             <h2 className="text-xl font-semibold text-accent mb-2">Add Announcement</h2>
//             <input
//               type="text"
//               className="w-full px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-white mb-2"
//               placeholder="Title"
//               value={title}
//               onChange={e => setTitle(e.target.value)}
//               required
//             />
//             <textarea
//               className="w-full px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-white mb-2"
//               placeholder="Content"
//               value={content}
//               onChange={e => setContent(e.target.value)}
//               required
//             />
//             <input
//               type="file"
//               className="block text-white mb-2"
//               onChange={e => setFile(e.target.files[0])}
//             />
//             <button
//               type="submit"
//               className="bg-primary hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white"
//             >
//               Post
//             </button>
//             {announceMsg && <div className="text-green-400 mt-2">{announceMsg}</div>}
//           </form>

//           <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
//             {/* Announcements Card */}
//             <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
//               <h2 className="text-xl font-semibold text-accent mb-2">
//                 Announcements
//               </h2>
//               {loading ? (
//                 <p className="text-gray-400">Loading...</p>
//               ) : announcements.length === 0 ? (
//                 <p className="text-gray-400">No announcements yet.</p>
//               ) : (
//                 <ul className="space-y-2">
//                   {announcements.map(a => (
//                     <li key={a._id} className="border-b border-zinc-700 pb-2">
//                       <div className="font-semibold">{a.title}</div>
//                       <div className="text-gray-300">{a.content}</div>
//                       {a.fileUrl && (
//                         <a
//                           href={`http://localhost:5001${a.fileUrl}`}
//                           download
//                           className="text-blue-400 underline"
//                           target="_blank"
//                           rel="noopener noreferrer"
//                         >
//                           Download Attachment
//                         </a>
//                       )}
//                       {/* Use a.date instead of a.createdAt */}
//                       <div className="text-xs text-gray-500">{a.date ? new Date(a.date).toLocaleString() : ""}</div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>

//             {/* Your Activity Card */}
//             <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
//               <div className="text-xl font-semibold text-accent mb-2">Recent Issues:</div>
//               {myIssues.length === 0 ? (
//                 <p className="text-gray-400">No issues submitted.</p>
//               ) : (
//                 <ul>
//                   {myIssues.map(issue => (
//                     <li key={issue._id}>{issue.title}</li>
//                   ))}
//                 </ul>
//               )}
//               <div className="text-xl font-semibold text-accent mb-2 mt-4">Recent Feedback:</div>
//               {myFeedback.length === 0 ? (
//                 <p className="text-gray-400">No feedback submitted.</p>
//               ) : (
//                 <ul>
//                   {myFeedback.map(fb => (
//                     <li key={fb._id}>{fb.feedback}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem("token"); 
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

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myIssues, setMyIssues] = useState([]);
  const [myFeedback, setMyFeedback] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [announceMsg, setAnnounceMsg] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 async function fetchAnnouncements() {
  setLoading(true);
  try {
    const res = await axios.get("http://localhost:5001/api/announcements", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setAnnouncements(res.data);
  } catch {
    setAnnouncements([]);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // Announcement form submit handler
  async function handleAnnouncementSubmit(e) {
    e.preventDefault();
    setAnnounceMsg("");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      await axios.post("http://localhost:5001/api/announcements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTitle("");
      setContent("");
      setFile(null);
      setAnnounceMsg("Announcement posted!");
      fetchAnnouncements();
    } catch (err) {
      setAnnounceMsg("Posted announcement.");
      console.error("Announcement error:", err);
    }
  }

  // Fetch user data for permissions
  useEffect(() => {
    async function fetchUserData() {
      try {
        const res = await axios.get("http://localhost:5001/api/users/me/data", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data.user);
        const sortedIssues = res.data.issues
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 2);
        const sortedFeedback = res.data.feedback
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 2);

        setMyIssues(sortedIssues);
        setMyFeedback(sortedFeedback);
      } catch (err) {
        setUser(null);
        setMyIssues([]);
        setMyFeedback([]);
      }
    }
    fetchUserData();
  }, []);

  // Edit and Delete handlers for announcements
  const handleEdit = (a) => {
    setEditingId(a._id);
    setEditTitle(a.title);
    setEditContent(a.content);
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5001/api/announcements/${id}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      setEditTitle("");
      setEditContent("");
      fetchAnnouncements();
    } catch {
      setError("Failed to update announcement");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/announcements/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(announcements.filter(a => a._id !== id));
    } catch {
      setError("Failed to delete announcement");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen relative bg-zinc-950">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-40 -left-32 w-[600px] h-[600px] bg-indigo-500/20 blur-3xl rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full opacity-25 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="px-6 py-8 relative z-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:opacity-90 px-7 py-3 rounded-lg text-base font-semibold text-white transition mt-2 mb-6"
          >
            Logout
          </button>

          {/* Announcement Form */}
          <form className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md mb-8" onSubmit={handleAnnouncementSubmit}>
            <h2 className="text-xl font-semibold text-accent mb-2">Add Announcement</h2>
            <input
              type="text"
              className="w-full px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-white mb-2"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full px-3 py-2 rounded border border-zinc-700 bg-zinc-800 text-white mb-2"
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <input
              type="file"
              className="block text-white mb-2"
              onChange={e => setFile(e.target.files[0])}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold text-white"
            >
              Post
            </button>
            {announceMsg && <div className="text-green-400 mt-2">{announceMsg}</div>}
          </form>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Announcements Card */}
            <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-accent mb-2">
                Announcements
              </h2>
              {error && <div className="text-red-400 mb-2">{error}</div>}
              {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : announcements.length === 0 ? (
                <p className="text-gray-400">No announcements yet.</p>
              ) : (
              // ...existing code...
<ul className="space-y-4">
  {announcements.map(a => {
    // Is this my announcement?
    const isMine = user && (user._id === String(a.user?._id || a.user));
    // Is user CR or teacher?
    const isCRorTeacher = user && ["cr", "teacher"].includes(user.role);

    return (
      <li
        key={a._id}
        className={`rounded-lg p-4 flex justify-between items-start ${
          isMine ? "border-2 border-purple-200" : "border-2 border-purple-200"
        } bg-zinc-950`}
      >
        {editingId === a._id ? (
          <div className="flex-1">
            <input
              className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full mb-2 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700"
              value={editContent}
              onChange={e => setEditContent(e.target.value)}
              placeholder="Content"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                className="bg-green-600 px-3 py-1 rounded text-white"
                onClick={() => handleUpdate(a._id)}
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
              <div className="font-semibold">{a.title}</div>
              <div className="text-gray-300">{a.content}</div>
              {a.fileUrl && (
                <a
                  href={`http://localhost:5001${a.fileUrl}`}
                  download
                  className="text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Attachment
                </a>
              )}
              <div className="text-xs text-gray-500">{a.date ? new Date(a.date).toLocaleString() : ""}</div>
            </div>
            {(isCRorTeacher || isMine) && (
              <div className="flex flex-col gap-2 ml-4">
                <button
                  className="bg-yellow-600 px-2 py-1 rounded text-white flex items-center gap-1"
                  onClick={() => handleEdit(a)}
                  title="Edit"
                >
                  <PenIcon />
                </button>
                <button
                  className="bg-red-600 px-2 py-1 rounded text-white flex items-center gap-1"
                  onClick={() => handleDelete(a._id)}
                  title="Delete"
                >
                  <BinIcon />
                </button>
              </div>
            )}
          </>
        )}
      </li>
    );
  })}
</ul>
// ...existing code...
              )}
            </div>

            {/* Your Activity Card */}
            <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="text-xl font-semibold text-accent mb-2">Recent Issues:</div>
              {myIssues.length === 0 ? (
                <p className="text-gray-400">No issues submitted.</p>
              ) : (
                <ul>
                  {myIssues.map(issue => (
                    <li key={issue._id}>{issue.title}</li>
                  ))}
                </ul>
              )}
              <div className="text-xl font-semibold text-accent mb-2 mt-4">Recent Feedback:</div>
              {myFeedback.length === 0 ? (
                <p className="text-gray-400">No feedback submitted.</p>
              ) : (
                <ul>
                  {myFeedback.map(fb => (
                    <li key={fb._id}>{fb.feedback}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}