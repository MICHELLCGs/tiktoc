import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import CommentsModal from './CommentsModal';
import { createViewHistory } from '../api/view_historyService';
import '../styles/VideoCard.css';

const VideoCard = (props) => {
  const { id, url, username, description, song, likes, comments, profilePic, setVideoRef, commentList, onCommentsToggle, isCurrentVideo, userId } = props;
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [videoComments, setVideoComments] = useState(commentList);
  const [secondsWatched, setSecondsWatched] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      const seconds = Math.floor(currentTime);
      setSecondsWatched(seconds);
      console.log(`Video ID: ${userId} - Seconds Watched: ${seconds} seconds`);
      
    };

    const handlePause = async () => {
      if (secondsWatched > 0) {
        // Obtener la fecha actual y formatearla
        const date = new Date();
        const formattedDate = date.toISOString().split('.')[0]; // Elimina los milisegundos
        const viewData = {
          userId,
          videoId: id,
          dateViewed: formattedDate, // Utilizar la fecha formateada
          duration: secondsWatched,
        };
        console.log(viewData);
        try {
          await createViewHistory(viewData);
          console.log(`View history saved for video ID: ${id}`);
        } catch (error) {
          console.error('Error saving view history:', error);
        }
      }
    };
    

    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handlePause);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handlePause);
    };
  }, [id, secondsWatched, userId]);

  useEffect(() => {
    if (!isCurrentVideo) {
      videoRef.current.currentTime = 0;
      setSecondsWatched(0);
    }
  }, [isCurrentVideo]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play().catch(error => {
        console.error('Error al reproducir el video:', error);
      });
    } else {
      videoRef.current.pause();
    }
  };

  const toggleComments = () => {
    const newShowComments = !showComments;
    setShowComments(newShowComments);
    onCommentsToggle(newShowComments);
  };

  const addComment = (newComment) => {
    setVideoComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="video">
      <video
        id={id}
        key={url}
        className="player"
        onClick={onVideoPress}
        ref={(ref) => {
          videoRef.current = ref;
          setVideoRef(ref);
        }}
        loop
        src={url}
      ></video>
      <div className="bottom-controls">
        <div className="footer-left">
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          <FooterRight 
            likes={likes} 
            comments={comments} 
            profilePic={profilePic}  
            commentList={commentList} 
            onCommentsToggle={toggleComments}
            showComments={showComments}
          />
        </div>
      </div>
      {showComments && (
        <CommentsModal 
          comments={videoComments}
          onClose={toggleComments}
          onCommentSubmit={addComment}
        />
      )}
    </div>
  );
};

export default VideoCard;

