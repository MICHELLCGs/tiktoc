
import React from 'react';
import '../styles/DesktopVideoCard.css';

const DesktopVideoCard = ({ id, url, username, description, song, likes, comments = [], profilePic, userId }) => {
  return (
    <div className="desktop-video-card">
      <video className="desktop-player" controls src={url}></video>
      <div className="video-info">
        <div className="profile-pic">
          <img src={profilePic} alt={`${username}'s profile`} />
        </div>
        <div className="video-details">
          <h3>{username}</h3>
          <p>{description}</p>
          <p>{song}</p>
        </div>
        <div className="video-stats">
          <p>{likes} Likes</p>
          <p>{comments.length} Comments</p>
        </div>
      </div>
    </div>
  );
};

export default DesktopVideoCard;
