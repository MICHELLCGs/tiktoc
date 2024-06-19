import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/homeDesktop.css';
import DesktopVideoCard from '../../components/DesktopVideoCard';
import TopNavbar from '../../components/TopNavbar';
import { fetchNextVideo } from '../../api/videoService';

function HomeDesktop() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchRecommendedVideo = async () => {
      try {
        const nextVideo = await fetchNextVideo(user.user_id.toString());
        setVideos(prevVideos => [...prevVideos, nextVideo]);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
      }
    };

    if (user) {
      fetchRecommendedVideo();
    }
  }, [user]);

  return (
    <div className="home-desktop">
      <TopNavbar className="top-navbar" />
      <div className="videos-grid">
        {videos.map((video, index) => (
          <DesktopVideoCard
            key={index}
            id={video.id_video}
            username={video.username}
            description={video.tags}
            song={video.song}
            likes={video.likes}
            comments={video.comments || []} // Proporciona un array vacío si comments es undefined
            url={'https://cdn.tiktoc.pro/' + video.filename}
            profilePic={user.profile_picture}
            userId={user.user_id}
          />
        ))}
      </div>
    </div>
  );
}

export default HomeDesktop;
