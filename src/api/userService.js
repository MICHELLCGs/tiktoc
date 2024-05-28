import axios from './axiosConfig';

export const fetchUsers = async () => {
  return await axios.get('/api/users');
};

export const createUser = async (userData) => {
  return await axios.post('/api/users', userData);
};

export const getUser = async (userId) => {
  return await axios.get(`/api/users/${userId}`);
};

export const updateUser = async (userId, userData) => {
  return await axios.put(`/api/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return await axios.delete(`/api/users/${userId}`);
};
