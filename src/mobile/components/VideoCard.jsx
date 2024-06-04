import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import CommentsModal from './CommentsModal';
import './VideoCard.css';

const VideoCard = (props) => {
  const { id, url, username, description, song, likes, comments, profilePic, setVideoRef, autoplay, commentList, onCommentsToggle, isCurrentVideo } = props;
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [videoComments, setVideoComments] = useState(commentList);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  useEffect(() => {
    const handleTimeUpdate = () => {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const percentagePlayed = Math.min((currentTime / duration) * 100, 100);
      if (!isNaN(percentagePlayed)) {
        console.log(`Video ID: ${id} - Percentage Played: ${percentagePlayed.toFixed(2)}%`);
      }
    };

    const handleProgress = () => {
      const buffered = videoRef.current.buffered;
      if (buffered.length > 0) {
        const bufferEnd = buffered.end(buffered.length - 1);
        const duration = videoRef.current.duration;
        const bufferPercentage = (bufferEnd / duration) * 100;
        console.log(`Video ID: ${id} - Buffered: ${bufferPercentage.toFixed(2)}%`);
      }
    };

    const handleLoadedMetadata = () => {
      console.log(`Video ID: ${id} - Percentage Played: 0.00%`);
    };

    const videoElement = videoRef.current;
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    videoElement.addEventListener('progress', handleProgress);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
      videoElement.removeEventListener('progress', handleProgress);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [id]);

  useEffect(() => {
    if (!isCurrentVideo) {
      videoRef.current.currentTime = 0;
      console.log(`Video ID: ${id} - Percentage Played: 0.00%`);
    }
  }, [isCurrentVideo]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
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
