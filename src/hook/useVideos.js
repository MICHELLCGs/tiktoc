import { useState, useEffect } from 'react';
import {
  fetchVideos as fetchVideosAPI,
  createVideo as createVideoAPI,
  getVideo as getVideoAPI,
  updateVideo as updateVideoAPI,
  deleteVideo as deleteVideoAPI
} from '../api/videoService';

const useVideos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [videos, setVideos] = useState([]);

  // Función para obtener la lista de videos
  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetchVideosAPI();
      setVideos(response.data.videos);
    } catch (error) {
      setErrorMessage(error.message || 'Error al obtener videos');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Función para crear un nuevo video
  const createVideo = async (videoData) => {
    setIsLoading(true);
    try {
      const response = await createVideoAPI(videoData);
      setVideos([...videos, response.data.video]);
    } catch (error) {
      setErrorMessage(error.message || 'Error al crear video');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para obtener un video por su ID
  const getVideo = async (videoId) => {
    setIsLoading(true);
    try {
      const response = await getVideoAPI(videoId);
      return response.data.video;
    } catch (error) {
      setErrorMessage(error.message || 'Error al obtener video');
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  // Función para actualizar un video existente
  const updateVideo = async (videoId, videoData) => {
    setIsLoading(true);
    try {
      await updateVideoAPI(videoId, videoData);
      setVideos(videos.map(video => (video._id === videoId ? { ...video, ...videoData } : video)));
    } catch (error) {
      setErrorMessage(error.message || 'Error al actualizar video');
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un video por su ID
  const deleteVideo = async (videoId) => {
    setIsLoading(true);
    try {
      await deleteVideoAPI(videoId);
      setVideos(videos.filter(video => video._id !== videoId));
    } catch (error) {
      setErrorMessage(error.message || 'Error al eliminar video');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    errorMessage,
    videos,
    fetchVideos,
    createVideo,
    getVideo,
    updateVideo,
    deleteVideo
  };
};

export default useVideos;
