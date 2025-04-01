import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Task } from "../../reducer/taskReducer";
import { useTasks } from "../../contexts/TaskContext";

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { id, title, completed } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { theme } = useTheme();
  const { toggleTask, updateTask, deleteTask } = useTasks();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTask(id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div
      className={`flex items-center p-4 border-b ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTask(id)}
        className="mr-2"
      />

      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className={`flex-grow px-2 py-1 border rounded ${
            theme === "dark" ? "bg-gray-700 border-gray-600" : ""
          }`}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            } else if (e.key === "Escape") {
              setIsEditing(false);
              setEditedTitle(title);
            }
          }}
        />
      ) : (
        <div className="flex-grow">
          <span className={completed ? "line-through text-gray-400" : ""}>
            {title}
          </span>
          <div className="text-xs text-gray-500 mt-1">
            Created : {formatDate(task.createdAt)}
          </div>
        </div>
      )}

      <div className="space-x-2">
        {isEditing ? (
          <>
            {" "}
            <button
              onClick={handleSave}
              className="px-2 py-1 text-xs bg-green-500 text-white rounded"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedTitle(title);
              }}
              className="px-2 py-1 text-xs bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => deleteTask(id)}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
