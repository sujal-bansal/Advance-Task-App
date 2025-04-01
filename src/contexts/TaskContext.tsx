import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  initialTaskState,
  TaskAction,
  TaskReducer,
  TaskState,
} from "../reducer/taskReducer";

type TaskContextType = {
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  toggleTask: (id: string) => void;
  addTask: (title: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, title: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(TaskReducer, initialTaskState);

  useEffect(() => {
    const loadTasks = () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);
          dispatch({ type: "INITIALIZE", payload: parsedTasks });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: [
              {
                id: "1",
                title: "Learn useReducer hook",
                completed: false,
                createdAt: Date.now(),
              },
              {
                id: "2",
                title: "Implement task context",
                completed: false,
                createdAt: Date.now() - 1000 * 60 * 60,
              },
              {
                id: "3",
                title: "Build advanced features",
                completed: false,
                createdAt: Date.now() - 1000 * 60 * 60 * 2,
              },
            ],
          });
        }
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load tasks from storage",
        });
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const addTask = (title: string) => {
    dispatch({ type: "ADD_TASK", payload: { title } });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: "TOGGLE_TASK", payload: { id } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: { id } });
  };

  const updateTask = (id: string, title: string) => {
    dispatch({ type: "UPDATE_TASK", payload: { title, id } });
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        addTask,
        toggleTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context == undefined) {
    throw new Error("useTasks must be used with TaskProvider");
  }
  return context;
};
