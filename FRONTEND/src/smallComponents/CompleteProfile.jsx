// src/pages/CompleteProfile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const CompleteProfile = () => {
  const [username, setusername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("username is required");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

  const token = await user.getIdToken();
  const BASE_URL=import.meta.env.VITE_API_BASE_URL;

  const API_URL=`${BASE_URL}/user/complete-profile`
  console.log("Complete Profile initiated--",API_URL)

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }
        await user.getIdToken(true);

      // ✅ Profile completed → go home
      navigate("/", { replace: true });

    } catch (err) {
      setError("Failed to complete profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-gray-800">
          Complete Your Profile
        </h2>

        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );


};

export default CompleteProfile;
