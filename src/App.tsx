import React from "react";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import Header from "./components/layout/Header";
import TaskList from "./components/tasks/TaskList";

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// Separate component to consume the theme context
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <Header />
      <main className="container mx-auto p-4">
        <TaskList />
      </main>
    </div>
  );
};

export default App;
