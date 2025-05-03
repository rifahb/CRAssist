import React from "react";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] relative overflow-hidden bg-gray-950 text-white px-6 py-10">
        {/* Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-20 w-[600px] h-[600px] bg-purple-600/30 blur-3xl rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/30 blur-2xl rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-500/20 blur-2xl rounded-full opacity-30 animate-pulse"></div>
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-primary">About CRAssist</h1>
          <p className="text-lg text-gray-300">
            CRAssist is an AI-powered system that helps manage class-related responsibilities like feedback, announcements, assignments, and scheduling.
          </p>
          <p className="text-gray-400">
            Our goal is to simplify and streamline class coordination with an intelligent assistant for students, teachers, and admins.
          </p>
        </div>
      </div>
    </Layout>
  );
}
