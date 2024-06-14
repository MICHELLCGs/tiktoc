import axios from './axiosConfig';

// Función para obtener todas las visualizaciones
export const fetchAllViewHistory = async () => {
  try {
    const response = await axios.get('/view_history');
    return response.data.view_history;
  } catch (error) {
    console.error('Error fetching view history:', error);
    throw error;
  }
};

// Función para obtener todas las visualizaciones por userId
export const fetchViewHistoryByUser = async (userId) => {
  try {
    const response = await axios.get(`/view_history/user/${userId}`);
    return response.data.view_history;
  } catch (error) {
    console.error(`Error fetching view history for user ${userId}:`, error);
    throw error;
  }
};

// Función para obtener todas las visualizaciones por videoId
export const fetchViewHistoryByVideo = async (videoId) => {
  try {
    const response = await axios.get(`/view_history/video/${videoId}`);
    return response.data.view_history;
  } catch (error) {
    console.error(`Error fetching view history for video ${videoId}:`, error);
    throw error;
  }
};

// Función para crear una nueva visualización
export const createViewHistory = async (viewData) => {
  try {
    const response = await axios.post('/view_history', viewData);
    return response.data;
  } catch (error) {
    console.error('Error creating view history:', error);
    throw error;
  }
};

// Función para obtener detalles de una visualización por su ID
export const getViewHistory = async (viewId) => {
  try {
    const response = await axios.get(`/view_history/${viewId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching view history with id ${viewId}:`, error);
    throw error;
  }
};

// Función para actualizar detalles de una visualización por su ID
export const updateViewHistory = async (viewId, viewData) => {
  try {
    const response = await axios.put(`/view_history/${viewId}`, viewData);
    return response.data;
  } catch (error) {
    console.error(`Error updating view history with id ${viewId}:`, error);
    throw error;
  }
};
