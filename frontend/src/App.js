import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";

function App() {
  const [reload, setReload] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.remove(darkMode ? "light-mode" : "dark-mode");
    document.body.classList.add(darkMode ? "dark-mode" : "light-mode");
  }, [darkMode]);

  const refreshTasks = () => {
    setReload((prev) => !prev);
  };

  const clearEditing = () => {
    setEditingTask(null);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`task-app container my-5 ${darkMode ? "dark-mode" : "light-mode"}`}
    >
      <div className="app-header text-center mb-5 p-4 rounded-4 shadow-sm">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div>
            <h2 className="fw-bold mb-1">Task Tracker</h2>
            <p className="text-muted mb-0">
              Add, delete, and manage your tasks quickly.
            </p>
          </div>
          <button
            type="button"
            className={`btn btn-sm theme-toggle-button ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      <div className="row gx-4">
        <div className="col-lg-5 mb-4">
          <TaskForm
            refreshTasks={refreshTasks}
            editingTask={editingTask}
            clearEditing={clearEditing}
          />
        </div>
        <div className="col-lg-7">
          <TaskList reload={reload} onEditTask={setEditingTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
