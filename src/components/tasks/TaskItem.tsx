import React, { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

type TaskProps = {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TaskItem: React.FC<TaskProps> = ({
  id,
  title,
  completed,
  onToggle,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const { theme } = useTheme();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      console.log(`Saving task ${id} with new title: ${editedTitle}`);
      setIsEditing(false);
    }
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
        onChange={() => onToggle(id)}
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
        />
      ) : (
        <span
          className={`flex-grow ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {title}
        </span>
      )}

      <div className="space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="px-2 py-1 text-xs bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
