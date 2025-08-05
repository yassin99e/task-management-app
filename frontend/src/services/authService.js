import API from './api';

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/me');
