import React, { useState, useEffect } from "react";
import { RefreshCcw, Copy, Check } from "lucide-react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line
  }, []);

  const generatePassword = () => {
    let lower = "abcdefghijklmnopqrstuvwxyz";
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = lower;
    let requiredChars = [];

    if (includeUppercase) {
      charset += upper;
      requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
    }
    if (includeNumbers) {
      charset += numbers;
      requiredChars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (includeSymbols) {
      charset += symbols;
      requiredChars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }

    let generated = requiredChars.join("");
    for (let i = generated.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randomIndex];
    }
    generated = generated
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(generated);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-gray-100 rounded-xl shadow-1g border-b-black max-w-lg mx-auto overflow-hidden mt-20">
      {/* Header */}

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          🔐 Password Generator
        </h2>
        <p className="text-white/80 text-sm">
          Create strong & secure passwords
        </p>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Password display */}
        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-gray-100 rounded-lg p-3 pr-12 font-mono text-lg border focus:outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-800"
          >
            {copied ? <Check /> : <Copy />}
          </button>
        </div>
        {copied && (
          <p className="text-green-600 text-sm text-center">Copied!</p>
        )}

        {/* Length Slider */}
        <div>
          <label className="block text-gray-700 font-medium">
            Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              label: "Include Uppercase",
              checked: includeUppercase,
              toggle: () => setIncludeUppercase(!includeUppercase),
            },
            {
              label: "Include Numbers",
              checked: includeNumbers,
              toggle: () => setIncludeNumbers(!includeNumbers),
            },
            {
              label: "Include Symbols",
              checked: includeSymbols,
              toggle: () => setIncludeSymbols(!includeSymbols),
            },
          ].map((opt, idx) => (
            <label
              key={idx}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-700">{opt.label}</span>
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={opt.toggle}
                className="w-5 h-5 accent-blue-500"
              />
            </label>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          disabled={!includeUppercase && !includeNumbers && !includeSymbols}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCcw size={18} /> Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
