import React, { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { useTheme } from "../../contexts/ThemeContext";
import { useTasks } from "../../contexts/TaskContext";

type FilterType = "all" | "active" | "completed";

const TaskList: React.FC = () => {
  const { state, addTask } = useTasks();
  const { tasks, loading, error } = state;

  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { theme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const handleSubmitTask = () => {
    const input = addTaskInputRef.current;
    if (input && input.value.trim()) {
      addTask(input.value.trim());
      input.value = "";
      input.focus();
    }
  };
  const filteredTasks = tasks
    .filter((task) => {
      if (filter == "active") return !task.completed;
      if (filter == "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div
      className={`container mx-auto p-4 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="mb-4">
        <div className="flex mb-2">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search tasks..."
            className={`flex-grow p-2 border rounded ${
              theme === "dark" ? "bg-gray-700 border-gray-600" : ""
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : theme === "dark"
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : theme === "dark"
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : theme === "dark"
                ? "bg-gray-700"
                : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
      </div>
      <div className="mb-4 flex">
        <input
          type="text"
          ref={addTaskInputRef}
          placeholder="Add a new task"
          className={`flex-grow p-2 border rounded-l ${
            theme === "dark" ? "bg-gray-700 border-gray-600" : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmitTask();
            }
          }}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-r"
          onClick={handleSubmitTask}
        >
          Add
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {loading ? (
        <div className="text-centre p-4">Loading tasks...</div>
      ) : (
        <div
          className={`border rounded shadow ${
            theme === "dark" ? "bg-gray-800 border-gray-700" : ""
          }`}
        >
          {filteredTasks.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {tasks.length === 0
                ? "No tasks yet! Add some above."
                : "No tasks match your current filters."}
            </div>
          ) : (
            filteredTasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      )}
      {/* Task counter */}
      <div className="mt-4 text-sm text-gray-500">
        {tasks.filter((t) => !t.completed).length} tasks left to complete
      </div>
    </div>
  );
};

export default TaskList;
