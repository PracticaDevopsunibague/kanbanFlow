import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://kanbanflow-gng0cycmg3arazgf.canadacentral-01.azurewebsites.net/api' 
  : 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/profile/'),
};

export const projectsAPI = {
  getAll: () => api.get('/projects/'),
  create: (project) => api.post('/projects/', project),
  update: (id, project) => api.put(`/projects/${id}/`, project),
  delete: (id) => api.delete(`/projects/${id}/`),
};

export const tasksAPI = {
  getAll: (projectId) => api.get(`/tasks/?project=${projectId}`),
  create: (task) => api.post('/tasks/', task),
  update: (id, task) => api.put(`/tasks/${id}/`, task),
  updateStatus: (id, status) => api.patch(`/tasks/${id}/update_status/`, { status }),
  delete: (id) => api.delete(`/tasks/${id}/`),
};

export default api;