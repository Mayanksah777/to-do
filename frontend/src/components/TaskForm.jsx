import { useState } from "react";

const TaskForm = ({ onAddTask, loading }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Task title is required");
      return;
    }

    setError("");
    const created = await onAddTask(trimmedTitle);
    if (created) {
      setTitle("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Add a new task..."
        maxLength={200}
        disabled={loading}
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Adding..." : "Add Task"}
      </button>
      {error && <p className="message error">{error}</p>}
    </form>
  );
};

export default TaskForm;
