import React, { useEffect, useState, useRef } from 'react';
import '../../styles/video.css';
import VideoCard from '../../components/VideoCard';
import BottomNavbar from '../../components/BottomNavbar';
import TopNavbar from '../../components/TopNavbar';
import { fetchNextVideo } from '../../api/videoService';
import { useAuth } from '../../context/AuthContext';

function Video() {
  const { user } = useAuth(); // Obtiene el usuario autenticado del contexto de autenticación
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [fetchingVideo, setFetchingVideo] = useState(false);

  const fetchRecommendedVideo = async () => {
    if (fetchingVideo) return; // Evitar solicitudes múltiples simultáneas
    try {
      setFetchingVideo(true); // Marcar que se está realizando una solicitud
      console.log(user.user_id);
      const nextVideo = await fetchNextVideo(user.user_id.toString()); // Usar el id del usuario autenticado
      setVideos(prevVideos => [...prevVideos, nextVideo]);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    } finally {
      setFetchingVideo(false); // Marcar que la solicitud ha finalizado
    }
  };
  
  useEffect(() => {
    if (user) {
      fetchRecommendedVideo();
    }
  }, [user.user_id.toString()]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8,
    };

    const handleIntersection = async (entries) => {
      for (const entry of entries) {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          try {
            await videoElement.play();
          } catch (error) {
            console.error('Error playing video:', error);
          }
          setCurrentVideoIndex(videoRefs.current.indexOf(videoElement));

          if (videoRefs.current.indexOf(videoElement) === videos.length - 1) {
            await fetchRecommendedVideo();
          }
        } else {
          videoElement.pause();
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            id={video.id_video}
            username={video.username}
            description={video.tags}
            song={video.song}
            likes={video.likes}
            comments={video.comments}
            url={'https://cdn.tiktoc.pro/' + video.filename}
            profilePic={video.profilePic}
            commentList={video.commentList}
            setVideoRef={handleVideoRef(index)}
            autoplay={false} // Desactivar la reproducción automática
            isCurrentVideo={index === currentVideoIndex}
            userId={user.user_id}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default Video;
