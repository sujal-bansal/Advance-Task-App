import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`p-4 shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-purple-600 text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">React Hooks Dashboard</h1>
        <button
          onClick={toggleTheme}
          className={`px-3 py-1 rounded ${
            theme === "dark" ? "bg-gray-600" : "bg-purple-700"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
};

export default Header;
