import { useState, useEffect } from "react";
import { DivideIcon, MoonIcon, Sun, SunIcon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const root = document.documentElement;

    if (savedTheme === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false); 
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false); 
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-max px-4 py-2  border-0 text-[var(--color-muted-foreground)] font-bold transition-all duration-300
               "
    >
      {isDark ? (
        <div className="flex justify-between items-end gap-2 ">
         
            <SunIcon />
          LightMode
        </div>
      ) : (
        <div  className="flex justify-between items-end gap-2 ">
         <MoonIcon />
          DarkMode
        </div>
      )}
    </button>
  );
}
