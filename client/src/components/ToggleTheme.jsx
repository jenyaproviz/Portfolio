import React, { useEffect, useState } from "react";

// Detect system theme
function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

// Modern ToggleTheme component
function ToggleTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || getSystemTheme();
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex items-center justify-center py-4 px-2">
      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="relative w-16 h-10 flex items-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 rounded-full px-2 py-2 transition-colors duration-300 focus:outline-none shadow-lg border border-gray-300 dark:border-gray-700"
        style={{ minWidth: "64px", minHeight: "40px" }}
      >
        <span
          className={`absolute left-2 top-2 w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md transition-transform duration-300 flex items-center justify-center ${
            theme === "dark" ? "translate-x-6" : ""
          }`}
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          {theme === "dark" ? (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                fill="#fbbf24"
              />
            </svg>
          ) : (
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" fill="#fbbf24" />
              <path
                d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
                stroke="#fbbf24"
                strokeWidth="2"
              />
            </svg>
          )}
        </span>
        {/* No text, icon-only toggle for cleaner appearance */}
      </button>
    </div>
  );
}

export default ToggleTheme;
