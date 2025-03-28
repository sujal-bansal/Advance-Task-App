import React, { useEffect, useRef, useState } from "react";
import TaskItem from "./TaskItem";
import { useTheme } from "../../contexts/ThemeContext";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type FilterType = "all" | "active" | "completed";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: "1", title: "Learn useState hook", completed: false },
          { id: "2", title: "Build a React app", completed: false },
          { id: "3", title: "Master useEffect", completed: false },
        ];
  });
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggle = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
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
          placeholder="Add a new task"
          className={`flex-grow p-2 border rounded-l ${
            theme === "dark" ? "bg-gray-700 border-gray-600" : ""
          }`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              handleAddTask(e.currentTarget.value.trim());
              e.currentTarget.value = "";
            }
          }}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-r"
          onClick={() => {
            const input = document.querySelector(
              'input[placeholder="Add a new task"]'
            );
            if (input instanceof HTMLInputElement && input.value.trim()) {
              handleAddTask(input.value.trim());
              input.value = "";
            }
          }}
        >
          Add
        </button>
      </div>

      {/* Task List */}
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
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Task counter */}
      <div className="mt-4 text-sm text-gray-500">
        {tasks.filter((t) => !t.completed).length} tasks left to complete
      </div>
    </div>
  );
};

export default TaskList;
