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
    <div className="min-h-screen bg-[#0d1117] flex items-start justify-center p-4 sm:p-8">
      <div className="bg-[#161b22] rounded-2xl shadow-lg w-full max-w-4xl p-6 sm:p-10 border border-[#30363d]">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#c9d1d9] flex items-center gap-2">
            🔐 Password Generator
          </h2>
          <p className="text-[#8b949e] text-sm sm:text-base">
            Create strong & secure passwords
          </p>
        </div>

        {/* Password Display */}
        <div className="relative mb-6">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-[#0d1117] text-[#c9d1d9] rounded-md p-3 sm:p-4 pr-12 font-mono text-base sm:text-lg border border-[#30363d] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]"
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#58a6ff] hover:text-[#79c0ff]"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
          </button>
          {copied && (
            <p className="text-[#3fb950] text-sm text-center mt-2">Copied!</p>
          )}
        </div>

        {/* Length Slider */}
        <div className="mb-6">
          <label className="block text-[#c9d1d9] font-medium mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            min="6"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-[#58a6ff]"
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
              className="flex items-center justify-between p-3 sm:p-4 bg-[#161b22] rounded-md border border-[#30363d] cursor-pointer hover:bg-[#21262d]"
            >
              <span className="text-[#c9d1d9] text-sm sm:text-base">
                {opt.label}
              </span>
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={opt.toggle}
                className="w-5 h-5 accent-[#58a6ff]"
              />
            </label>
          ))}
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          disabled={!includeUppercase && !includeNumbers && !includeSymbols}
          className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-semibold py-3 sm:py-4 rounded-md flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <RefreshCcw size={18} /> Generate Password
        </button>
      </div>
    </div>
  );
};

export default PasswordGenerator;
