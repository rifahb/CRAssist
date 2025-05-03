import { useState } from "react";
import Layout from "../components/Layout";

export default function Issue() {
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
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-white relative z-10 px-6 py-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Report an Issue</h1>
          <form className="space-y-4 max-w-xl">
            <input
              type="text"
              placeholder="Issue title"
              className="w-full px-4 py-2 rounded-lg bg-zinc-800/60 backdrop-blur-md border border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
            />
            <textarea
              rows="5"
              placeholder="Describe your issue..."
              className="w-full px-4 py-3 rounded-lg bg-zinc-800/60 backdrop-blur-md border border-zinc-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-primary"
            ></textarea>
            <button className="bg-primary hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold">
              Submit Issue
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
