import Layout from "../components/Layout";
import { useState } from "react";

export default function Dashboard() {
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
              <p className="text-gray-400">No announcements yet.</p>
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
