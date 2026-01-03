import { useState } from "react";

export default function NoteOptions({ onChange }) {
  const [options, setOptions] = useState({
    section: "",
    subject: "",
    tags: "",
    color: "#ffffff",
    pinned: false,
    favorite: false,
    reminder: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updated = { ...options, [name]: val };
    setOptions(updated);
    onChange(updated); // send to parent
  };

  return (
    <div className="flex flex-wrap gap-4 bg-[#161b22] p-4 rounded-xl shadow-md text-sm">
      {/* Section */}
      <input
        type="text"
        name="section"
        placeholder="Section"
        value={options.section}
        onChange={handleChange}
        className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none w-36"
      />

      {/* Subject */}
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={options.subject}
        onChange={handleChange}
        className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none w-36"
      />

      {/* Tags */}
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        value={options.tags}
        onChange={handleChange}
        className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none w-52"
      />

      {/* Color */}
      <input
        type="color"
        name="color"
        value={options.color}
        onChange={handleChange}
        className="w-10 h-10 border-none rounded-lg cursor-pointer"
      />

      {/* Reminder */}
      <input
        type="datetime-local"
        name="reminder"
        value={options.reminder}
        onChange={handleChange}
        className="bg-transparent border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none"
      />

      {/* Checkboxes */}
      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          name="pinned"
          checked={options.pinned}
          onChange={handleChange}
        />
        Pinned
      </label>

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          name="favorite"
          checked={options.favorite}
          onChange={handleChange}
        />
        Favorite
      </label>
    </div>
  );
}
