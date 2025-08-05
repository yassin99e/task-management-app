import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getTasks = () => axios.get(API_URL, authHeader());
export const createTask = (data) => axios.post(API_URL, data, authHeader());
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`, authHeader());
export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data, authHeader());
