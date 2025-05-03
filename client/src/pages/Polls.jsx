import { useState } from "react";
import Layout from "../components/Layout";

export default function Polls() {
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
          <h1 className="text-3xl font-bold text-primary mb-6">Vote in Polls</h1>
          <form className="space-y-4 max-w-xl">
            <fieldset className="bg-zinc-900/60 backdrop-blur-md p-6 rounded-xl border border-zinc-700">
              <legend className="text-accent text-lg font-semibold">
                Which feature do you want next?
              </legend>
              <div className="mt-3 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" className="accent-primary" /> Dark Mode
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" className="accent-primary" /> Calendar View
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="poll" className="accent-primary" /> Real-time Chat
                </label>
              </div>
            </fieldset>
            <button className="bg-primary hover:bg-purple-600 px-6 py-2 rounded-lg font-semibold">
              Submit Vote
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
