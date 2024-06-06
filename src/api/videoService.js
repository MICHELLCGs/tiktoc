import axios from './axiosConfig';

// Función para obtener todos los videos
export const fetchVideos = async () => {
  try {
    const response = await axios.get('http://backend1.tiktoc.pro/videos');
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

// Función para crear un nuevo video
export const createVideo = async (videoData) => {
  try {
    const response = await axios.post('http://backend1.tiktoc.pro/videos', videoData);
    return response.data;
  } catch (error) {
    console.error('Error creating video:', error);
    throw error;
  }
};

// Función para obtener un video por su ID
export const getVideo = async (id_video) => {
  try {
    const response = await axios.get(`http://backend1.tiktoc.pro/videos/${id_video}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id_video ${id_video}:`, error);
    throw error;
  }
};

// Función para actualizar un video existente
export const updateVideo = async (id_video, videoData) => {
  try {
    const response = await axios.put(`http://backend1.tiktoc.pro/videos/${id_video}`, videoData);
    return response.data;
  } catch (error) {
    console.error(`Error updating video with id_video ${id_video}:`, error);
    throw error;
  }
};

// Función para eliminar un video
export const deleteVideo = async (id_video) => {
  try {
    const response = await axios.delete(`http://backend1.tiktoc.pro/videos/${id_video}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting video with id_video ${id_video}:`, error);
    throw error;
  }
};
