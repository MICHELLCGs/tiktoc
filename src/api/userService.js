import axios from './axiosConfig';

// Función para obtener todos los usuarios
export const fetchUsers = async () => {
  try {
    const response = await axios.get('http://backend1.tiktoc.pro/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Función para crear un nuevo usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post('http://backend1.tiktoc.pro/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Función para obtener un usuario por su ID
export const getUser = async (user_id) => {
  try {
    const response = await axios.get(`http://backend1.tiktoc.pro/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with user_id ${user_id}:`, error);
    throw error;
  }
};

// Función para actualizar un usuario existente
export const updateUser = async (user_id, userData) => {
  try {
    const response = await axios.put(`http://backend1.tiktoc.pro/users/${user_id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with user_id ${user_id}:`, error);
    throw error;
  }
};

// Función para eliminar un usuario
export const deleteUser = async (user_id) => {
  try {
    const response = await axios.delete(`http://backend1.tiktoc.pro/users/${user_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with user_id ${user_id}:`, error);
    throw error;
  }
};
