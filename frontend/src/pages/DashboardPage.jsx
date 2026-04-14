import { useEffect, useState } from "react";
import TaskFilter from "../components/TaskFilter";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { getCurrentUser } from "../services/authService";
import taskService from "../services/taskService";

const matchesFilter = (task, filter) => {
  if (filter === "completed") return task.completed;
  if (filter === "pending") return !task.completed;
  return true;
};

const getApiError = (apiError) => {
  const responseData = apiError?.response?.data;
  if (responseData?.message) return responseData.message;
  if (Array.isArray(responseData?.errors) && responseData.errors.length > 0) {
    return responseData.errors[0].msg;
  }
  return "Something went wrong. Please try again.";
};

const DashboardPage = () => {
  const currentUser = getCurrentUser();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchTasks = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await taskService.getTasks(filter);
        if (mounted) {
          setTasks(data);
        }
      } catch (apiError) {
        if (mounted) {
          setError(getApiError(apiError));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchTasks();

    return () => {
      mounted = false;
    };
  }, [filter]);

  const handleAddTask = async (title) => {
    setCreating(true);
    setError("");

    try {
      const createdTask = await taskService.createTask(title);
      if (matchesFilter(createdTask, filter)) {
        setTasks((prev) => [createdTask, ...prev]);
      }
      return true;
    } catch (apiError) {
      setError(getApiError(apiError));
      return false;
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (task) => {
    setActiveTaskId(task._id);
    setError("");

    try {
      const updatedTask = await taskService.updateTask(task._id, {
        completed: !task.completed,
      });

      setTasks((prev) =>
        prev
          .map((item) => (item._id === updatedTask._id ? updatedTask : item))
          .filter((item) => matchesFilter(item, filter))
      );
    } catch (apiError) {
      setError(getApiError(apiError));
    } finally {
      setActiveTaskId("");
    }
  };

  const handleEdit = async (taskId, title) => {
    setActiveTaskId(taskId);
    setError("");

    try {
      const updatedTask = await taskService.updateTask(taskId, { title });
      setTasks((prev) => prev.map((item) => (item._id === updatedTask._id ? updatedTask : item)));
      return true;
    } catch (apiError) {
      setError(getApiError(apiError));
      return false;
    } finally {
      setActiveTaskId("");
    }
  };

  const handleDelete = async (taskId) => {
    setActiveTaskId(taskId);
    setError("");

    try {
      await taskService.deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (apiError) {
      setError(getApiError(apiError));
    } finally {
      setActiveTaskId("");
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>{currentUser?.name ? `Hello, ${currentUser.name}` : "Your To-Do List"}</h1>
          <p className="subtitle">
            Keep your day organized. Add, edit, complete, and track your tasks.
          </p>
        </div>
        <TaskFilter activeFilter={filter} onChange={setFilter} />
      </div>

      <TaskForm onAddTask={handleAddTask} loading={creating} />

      {error && <p className="message error">{error}</p>}

      {loading ? (
        <p className="loading-state">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="empty-state">No tasks found for this filter.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={handleEdit}
              isBusy={activeTaskId === task._id}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default DashboardPage;
