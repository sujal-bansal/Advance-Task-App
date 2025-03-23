import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Add a new task"
          className="flex-grow p-2 border rounded-l"
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
            const input = document.querySelector("input");
            if (input && input.value.trim()) {
              handleAddTask(input.value.trim());
              input.value = "";
            }
          }}
        >
          Add
        </button>
      </div>

      <div className="border rounded shadow">
        {tasks.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No tasks yet! Add some above.
          </div>
        ) : (
          tasks.map((task) => (
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
    </div>
  );
};

export default TaskList;
