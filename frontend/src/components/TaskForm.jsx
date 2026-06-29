import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

function TaskForm({ refreshTasks, editingTask, clearEditing }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || "");
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      if (editingTask) {
        await axios.put(`${API_URL}/${editingTask._id}`, {
          title,
          description,
          completed: editingTask.completed,
        });
      } else {
        await axios.post(API_URL, {
          title,
          description,
        });
      }

      setTitle("");
      setDescription("");
      clearEditing();
      refreshTasks();
    } catch (error) {
      console.log(error);
      alert(editingTask ? "Error updating task" : "Error adding task");
    }
  };

  const handleCancel = () => {
    clearEditing();
    setTitle("");
    setDescription("");
  };

  return (
    <div className="card p-4 shadow-sm mb-4 task-form-card">
      <div className="mb-4">
        <h3 className="h5 fw-bold mb-1">Add new task</h3>
        <p className="text-muted mb-0">Create task items quickly and keep track of priorities.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Describe the task and any details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="d-grid gap-2">
          <button className="btn btn-primary btn-lg" type="submit">
            {editingTask ? "Update Task" : "Add Task"}
          </button>
          {editingTask && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={handleCancel}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;