import React, { useState, useEffect } from "react";
import { Trash, Copy, Lock, Eye, EyeOff, Pencil } from "lucide-react";

const PasswordManager = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [showPassword, setShowPassword] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Load passwords from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("passwords")) || [];
    setPasswords(saved);
  }, []);

  // Save passwords to localStorage
  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  const handleAddOrUpdate = () => {
    if (!title || !password) return alert("Please enter both fields.");

    if (editIndex !== null) {
      const updated = [...passwords];
      updated[editIndex] = { ...updated[editIndex], title, password };
      setPasswords(updated);
      setEditIndex(null);
    } else {
      const timeCreated = new Date().toLocaleString();
      setPasswords([...passwords, { title, password, time: timeCreated }]);
    }

    setTitle("");
    setPassword("");
  };

  const handleDelete = (index) => {
    setPasswords(passwords.filter((_, i) => i !== index));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const handleEdit = (index) => {
    setTitle(passwords[index].title);
    setPassword(passwords[index].password);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-start justify-center p-4 sm:p-8">
      <div className="bg-[#161b22] rounded-2xl shadow-lg w-full max-w-4xl p-6 sm:p-10 border border-[#30363d]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 sticky top-0 z-10 pb-4 border-b border-[#30363d] bg-[#161b22]">
          <Lock className="text-[#58a6ff]" size={36} />
          <h2 className="text-3xl sm:text-4xl font-bold text-[#c9d1d9]">
            Password Manager
          </h2>
        </div>

        {/* Inputs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <input
            type="text"
            placeholder="Website / App Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] rounded-lg px-5 py-3 shadow-sm min-w-[200px]"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-[#0d1117] text-[#c9d1d9] border border-[#30363d] focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] rounded-lg px-5 py-3 shadow-sm min-w-[200px]"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-[#238636] hover:bg-[#2ea043] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition w-full sm:w-auto"
          >
            {editIndex !== null ? "Update Password" : "Add Password"}
          </button>
        </div>

        {/* Saved Passwords */}
        <div className="space-y-5">
          {passwords.length === 0 ? (
            <p className="text-[#8b949e] text-lg text-center">
              No saved passwords yet.
            </p>
          ) : (
            passwords.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-[#161b22] hover:bg-[#21262d] rounded-xl border border-[#30363d] transition shadow-sm"
              >
                <div>
                  <p className="font-semibold text-lg text-[#c9d1d9]">
                    {item.title}
                  </p>
                  <p className="text-[#8b949e] font-mono text-base">
                    {showPassword[index]
                      ? item.password
                      : "*".repeat(item.password.length)}
                  </p>
                  <div className="flex items-center text-sm text-[#8b949e] mt-1">
                    {item.time}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        [index]: !prev[index],
                      }))
                    }
                    className="text-[#58a6ff] hover:text-[#79c0ff]"
                  >
                    {showPassword[index] ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => handleCopy(item.password)}
                    className="text-[#58a6ff] hover:text-[#79c0ff]"
                  >
                    <Copy size={20} />
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-[#58a6ff] hover:text-[#79c0ff]"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash size={20} />
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
