import axios from "axios";

const API_URL = "https://task-tracker-vskt.onrender.com/tasks";

function TaskItem({ task, refreshTasks, onEdit }) {
  if (!task) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${task._id}`);
      refreshTasks();
    } catch (error) {
      console.log(error);
      alert("Error deleting task");
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });

      refreshTasks();
    } catch (error) {
      console.log(error);
      alert("Error updating status");
    }
  };

  return (
    <div className={`card shadow-sm mb-3 task-card ${task.completed ? "task-completed" : ""}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className={`card-title mb-2 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
              {task.title}
            </h5>
            <p className={`card-text mb-2 ${task.completed ? "text-muted" : ""}`}>
              {task.description}
            </p>
          </div>

          <span className={`badge ${task.completed ? "bg-success" : "bg-warning text-dark"}`}>
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            className={`btn btn-sm ${task.completed ? "btn-outline-secondary" : "btn-outline-success"}`}
            onClick={handleToggleComplete}
          >
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>

          <button className="btn btn-outline-primary btn-sm" onClick={onEdit}>
            Edit
          </button>

          <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;