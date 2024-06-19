/*
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
*/

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/homeDesktop.css';
import DesktopVideoCard from '../../components/DesktopVideoCard';
import TopNavbar from '../../components/TopNavbar';
import { fetchNextVideo } from '../../api/videoService';

function HomeDesktop() {
  const { user } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendedVideos = async () => {
      setLoading(true);
      try {
        const initialVideo = await fetchNextVideo(user.user_id.toString());
        const additionalVideos = await Promise.all([
          fetchNextVideo(user.user_id.toString()),
          fetchNextVideo(user.user_id.toString()),
          fetchNextVideo(user.user_id.toString()),
          fetchNextVideo(user.user_id.toString())
        ]);
        setVideos([initialVideo, ...additionalVideos]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended videos:', error);
        setLoading(false);
      }
    };

    if (user) {
      fetchRecommendedVideos();
    }
  }, [user]);

  return (
    <div className="home-desktop">
      <TopNavbar className="top-navbar" />
      <div className="video-container">
        <div className="main-video">
          {videos.length > 0 && (
            <DesktopVideoCard
              id={videos[0].id_video}
              username={videos[0].username}
              description={videos[0].tags}
              song={videos[0].song}
              likes={videos[0].likes}
              comments={videos[0].comments || []}
              url={'https://cdn.tiktoc.pro/' + videos[0].filename}
              profilePic={user.profile_picture}
              userId={user.user_id}
            />
          )}
        </div>
        <div className="additional-videos">
          {videos.slice(1, 5).map((video, index) => (
            <DesktopVideoCard
              key={index}
              id={video.id_video}
              username={video.username}
              description={video.tags}
              song={video.song}
              likes={video.likes}
              comments={video.comments || []}
              url={'https://cdn.tiktoc.pro/' + video.filename}
              profilePic={user.profile_picture}
              userId={user.user_id}
              small // Propiedad adicional para indicar que estos son videos pequeños
            />
          ))}
        </div>
      </div>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default HomeDesktop;
