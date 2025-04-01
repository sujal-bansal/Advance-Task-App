import React, { useMemo } from "react";
import { useTasks } from "../../contexts/TaskContext";
import { useTheme } from "../../contexts/ThemeContext";

const TaskStatistics: React.FC = () => {
  const { state } = useTasks();
  const { theme } = useTheme();
  const { tasks } = state;

  const statistics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.completed === true
    ).length;
    const activeTasks = totalTasks - completedTasks;

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const now = Date.now();
    const tasksCreatedToday = tasks.filter((task) => {
      const taskDate = new Date(task.createdAt);
      const today = new Date();
      return (
        taskDate.getDate() === today.getDate() &&
        taskDate.getMonth() === today.getMonth() &&
        taskDate.getFullYear() === today.getFullYear()
      );
    }).length;

    const newTasks = tasks.filter(
      (task) => now - task.createdAt < 24 * 60 * 60 * 1000
    ).length;
    const oldTasks = tasks.filter(
      (task) => now - task.createdAt > 7 * 24 * 60 * 60 * 1000
    ).length;
    return {
      totalTasks,
      completedTasks,
      activeTasks,
      completionRate,
      tasksCreatedToday,
      newTasks,
      oldTasks,
    };
  }, [tasks]);

  return (
    <div
      className={`mt-6 p-4 border rounded shadow ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-bold mb-3">Task Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-blue-50"
          }`}
        >
          <div className="text-sm text-gray-500">Total Tasks</div>
          <div className="text-2xl font-bold">{statistics.totalTasks}</div>
        </div>

        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-green-50"
          }`}
        >
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-2xl font-bold">{statistics.completedTasks}</div>
        </div>

        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-yellow-50"
          }`}
        >
          <div className="text-sm text-gray-500">Active</div>
          <div className="text-2xl font-bold">{statistics.activeTasks}</div>
        </div>

        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-purple-50"
          }`}
        >
          <div className="text-sm text-gray-500">Completion Rate</div>
          <div className="text-2xl font-bold">{statistics.completionRate}%</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="text-sm text-gray-500">Created Today</div>
          <div className="text-2xl font-bold">
            {statistics.tasksCreatedToday}
          </div>
        </div>

        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="text-sm text-gray-500">New (&lt; 24h)</div>
          <div className="text-2xl font-bold">{statistics.newTasks}</div>
        </div>

        <div
          className={`p-3 rounded ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-50"
          }`}
        >
          <div className="text-sm text-gray-500">Old (&gt; 7d)</div>
          <div className="text-2xl font-bold">{statistics.oldTasks}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatistics;
