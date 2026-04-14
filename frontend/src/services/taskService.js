import api from "./api";

const getTasks = async (status = "all") => {
  const params = {};
  if (status !== "all") {
    params.status = status;
  }

  const response = await api.get("/tasks", { params });
  return response.data;
};

const createTask = async (title) => {
  const response = await api.post("/tasks", { title });
  return response.data;
};

const updateTask = async (taskId, payload) => {
  const response = await api.put(`/tasks/${taskId}`, payload);
  return response.data;
};

const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
