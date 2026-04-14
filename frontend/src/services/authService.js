import api from "./api";

const TOKEN_KEY = "todo_token";
const USER_KEY = "todo_user";

export const register = async (payload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const login = async (payload) => {
  const response = await api.post("/auth/login", payload);
  const { token, user } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return response.data;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => Boolean(localStorage.getItem(TOKEN_KEY));

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(USER_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (_error) {
    return null;
  }
};
