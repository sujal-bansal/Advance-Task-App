export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

export type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

export type TaskAction =
  | { type: "INITIALIZE"; payload: Task[] }
  | { type: "ADD_TASK"; payload: { title: string } }
  | { type: "TOGGLE_TASK"; payload: { id: string } }
  | { type: "UPDATE_TASK"; payload: { id: string; title: string } }
  | { type: "DELETE_TASK"; payload: { id: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

export const initialTaskState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const TaskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };

    case "ADD_TASK":
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: false,
        createdAt: Date.now(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };

    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, title: action.payload.title }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
