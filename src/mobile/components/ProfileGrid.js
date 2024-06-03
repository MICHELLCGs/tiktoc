// ProfileGrid.js
import React from 'react';
import './ProfileGrid.css'; // Importar estilos CSS


function ProfileGrid({ username, profilePic, description, followers, following}) {
  return (
    <div className="profile-grid">
      <div className="profile-info">
        <img src={profilePic} alt={username} className="profile-pic" />
        <h2>{username}</h2>
        <p>{description}</p>
        <div className="follow-info">
          <span>Seguidores: {followers}</span>
          <span>Siguiendo: {following}</span>
        </div>
      </div>
      
    </div>
  );
}

export default ProfileGrid;
