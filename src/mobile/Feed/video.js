import React, { useEffect, useState, useRef } from 'react';
import './video.css';
import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';
import { fetchNextVideo } from '../../components/api/videoService';

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [user, setUser] = useState({ id: '66632426681f73d3c244834b' }); // Estado para el usuario actual
  const [fetchingVideo, setFetchingVideo] = useState(false); // Estado para controlar si se está obteniendo un video actualmente

  const fetchRecommendedVideo = async () => {
    if (fetchingVideo) return; // Evitar solicitudes múltiples simultáneas

    try {
      setFetchingVideo(true); // Marcar que se está realizando una solicitud
      const nextVideo = await fetchNextVideo(user.id);
      setVideos(prevVideos => [...prevVideos, nextVideo]);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    } finally {
      setFetchingVideo(false); // Marcar que la solicitud ha finalizado
    }
  };

  useEffect(() => {
    fetchRecommendedVideo();
  }, [user.id]);

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
            id={video.id}
            username={video.username}
            description={video.tags}
            song={video.song}
            likes={video.likes}
            comments={video.comments}
            url={'https://cdn.tiktoc.pro/'+ video.filename}
            profilePic={video.profilePic}
            commentList={video.commentList}
            setVideoRef={handleVideoRef(index)}
            autoplay={false} // Desactivar la reproducción automática
            isCurrentVideo={index === currentVideoIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;
