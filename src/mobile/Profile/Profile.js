import React, { useState } from 'react';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';
import ProfileGrid from '../components/ProfileGrid';

function App() {
  // Creamos el usuario en una lista
  const [userProfileData, setUserProfileData] = useState({
    username: 'csjackie',
    profilePic: 'https://i.pinimg.com/736x/0b/d6/a5/0bd6a55a702410ed4594c2b1a590e068.jpg',
    description: '¡Hola! Soy Jackie, bienvenido a mi perfil.',
    followers: 3400,
    following: 300,
    videos: [
      { url: require('../videos/video1.mp4') },
      { url: require('../videos/video2.mp4') },
      { url: require('../videos/video3.mp4') },
      { url: require('../videos/video4.mp4') }
    ]
  });

  return (
    <div className="app" style={{ height: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="container" style={{ flex: 1, width: '100%', maxWidth: '600px' }}>      
        <ProfileGrid
          username={userProfileData.username}
          profilePic={userProfileData.profilePic}
          description={userProfileData.description}
          followers={userProfileData.followers}
          following={userProfileData.following}
        />
      </div>
      <BottomNavbar className="bottom-navbar" />
    </div>
  );
}

export default App;
