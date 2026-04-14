import { useState } from "react";

const TaskItem = ({ task, onToggle, onDelete, onEdit, isBusy }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [error, setError] = useState("");

  const handleSave = async () => {
    const trimmedTitle = editedTitle.trim();
    if (!trimmedTitle) {
      setError("Task title cannot be empty");
      return;
    }

    setError("");
    const updated = await onEdit(task._id, trimmedTitle);
    if (updated) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setError("");
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          disabled={isBusy}
        />
        <span />
      </label>

      <div className="task-content">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(event) => setEditedTitle(event.target.value)}
              maxLength={200}
              disabled={isBusy}
            />
            {error && <p className="message error">{error}</p>}
          </>
        ) : (
          <p className={`task-title ${task.completed ? "done" : ""}`}>{task.title}</p>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={isBusy}>
              Save
            </button>
            <button type="button" className="btn btn-outline" onClick={handleCancel} disabled={isBusy}>
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => setIsEditing(true)}
            disabled={isBusy}
          >
            Edit
          </button>
        )}
        <button type="button" className="btn btn-danger" onClick={() => onDelete(task._id)} disabled={isBusy}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
