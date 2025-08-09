import React, { useState, useEffect } from "react";
import { Trash, Copy, Lock } from "lucide-react";

const PasswordManager = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const addPassword = () => {
    if (!title || !password) return alert("Please enter both fields.");
    const newEntry = { id: Date.now(), title, password };
    setPasswords([...passwords, newEntry]);
    setTitle("");
    setPassword("");
  };

  const deletePassword = (id) => {
    setPasswords(passwords.filter((item) => item.id !== id));
  };

  const copyPassword = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Lock className="text-blue-600" size={28} />
          <h2 className="text-3xl font-bold text-gray-800">Password Manager</h2>
        </div>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Website / App Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded-lg px-4 py-2 text-gray-700"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition rounded-lg px-4 py-2 text-gray-700"
          />
          <button
            onClick={addPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Save Password
          </button>
        </div>

        {/* Saved Passwords */}
        <div className="mt-6 space-y-4">
          {passwords.length === 0 ? (
            <p className="text-gray-500 text-sm text-center">
              No saved passwords yet.
            </p>
          ) : (
            passwords.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition shadow-sm"
              >
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-600 font-mono text-sm">
                    {item.password}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => copyPassword(item.password)}
                    className="text-green-600 hover:text-green-800 transition"
                  >
                    <Copy size={18} />
                  </button>
                  <button
                    onClick={() => deletePassword(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;
