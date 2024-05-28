import axios from './axiosConfig';

// Función para obtener todos los videos
export const fetchVideos = async () => {
  return await axios.get('/api/videos');
};

// Función para crear un nuevo video
export const createVideo = async (videoData) => {
  return await axios.post('/api/videos', videoData);
};

// Función para obtener un video por su ID
export const getVideo = async (videoId) => {
  return await axios.get(`/api/videos/${videoId}`);
};

// Función para actualizar un video existente
export const updateVideo = async (videoId, videoData) => {
  return await axios.put(`/api/videos/${videoId}`, videoData);
};

// Función para eliminar un video
export const deleteVideo = async (videoId) => {
  return await axios.delete(`/api/videos/${videoId}`);
};
