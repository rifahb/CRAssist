import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleOptionChange = (idx, value) => {
    const newOptions = [...options];
    newOptions[idx] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = idx => setOptions(options.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (question.trim() === "" || options.some(opt => opt.trim() === "")) {
      setError("Please fill in the question and all options.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5001/api/polls",
        { question, options },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Poll created!");
      setTimeout(() => navigate("/polls"), 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create poll");
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 bg-zinc-900 p-8 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-4">Create a Poll</h2>
        {error && <div className="text-red-400 mb-2">{error}</div>}
        {success && <div className="text-green-400 mb-2">{success}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Question</label>
            <input
              className="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Options</label>
            {options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  className="flex-1 px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
                  value={opt}
                  onChange={e => handleOptionChange(idx, e.target.value)}
                  required
                />
                {options.length > 2 && (
                  <button type="button" onClick={() => removeOption(idx)} className="text-red-400">Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addOption} className="text-indigo-400 mt-2">Add Option</button>
          </div>
          <button type="submit" className="bg-indigo-600 px-4 py-2 rounded font-semibold">Create Poll</button>
        </form>
      </div>
    </Layout>
  );
}