import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

const API_URL = "https://task-tracker-vskt.onrender.com/tasks";

function TaskList({ reload, onEditTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      alert("Error loading tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [reload]);

  if (loading) {
    return (
      <div className="card shadow-sm p-4 text-center task-list-card">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 mb-0">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="card shadow-sm p-4 text-center task-list-card">
        <h3 className="h5 mb-2">No tasks yet</h3>
        <p className="text-muted mb-0">Add your first task using the form on the left.</p>
      </div>
    );
  }

  return (
    <div className="task-list-wrapper">
      <div className="d-flex justify-content-between align-items-end mb-3 flex-wrap gap-2">
        <div>
          <h3 className="h5 mb-1">Your tasks</h3>
          <p className="text-muted mb-0">Manage tasks with status and quick actions.</p>
        </div>
        <span className="task-count">Total tasks: {tasks.length}</span>
      </div>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          refreshTasks={fetchTasks}
          onEdit={() => onEditTask(task)}
        />
      ))}
    </div>
  );
}

export default TaskList;
