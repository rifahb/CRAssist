import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Dashboard() {
    const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await axios.get("http://localhost:5000/api/announcements");
        setAnnouncements(res.data);
      } catch {
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);
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
        <div className="px-6 py-8 relative z-10">
          <h1 className="text-4xl font-bold text-primary mb-4">Dashboard</h1>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {/* Announcements Card */}
            <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-accent mb-2">
                Announcements
              </h2>
               {loading ? (
                <p className="text-gray-400">Loading...</p>
              ) : announcements.length === 0 ? (
                <p className="text-gray-400">No announcements yet.</p>
              ) : (
                <ul className="space-y-2">
                  {announcements.map(a => (
                    <li key={a._id} className="border-b border-zinc-700 pb-2">
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-gray-300">{a.content}</div>
                      <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Your Activity Card */}
            <div className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
              <h2 className="text-xl font-semibold text-accent mb-2">
                Your Activity
              </h2>
              <p className="text-gray-400">No recent actions.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
