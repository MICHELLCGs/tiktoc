import React from 'react';
import VideoItem from './VideoItem';
import './ElementRight.scss';

function ElementRight() {
  const videoData = [
    {
      avatar: '/img-user-upload/avatar03.jpeg',
      userId: '06082013krj',
      userName: 'Carlina',
      details: '1-16',
      hashtags: ['#hocmoingay', '#xuhuong', '#trending'],
      musicBackground: '/logos/music-background.png',
      backgroundMusic: '无敌小可爱 - 叶雨岑',
      videoUrl: 'url-to-video-1',
    },
    {
      avatar: '/img-user-upload/avatar03.jpeg',
      userId: '06082013krj',
      userName: 'Hoài Thu (肖莫嫣)🏀',
      details: '1-16',
      hashtags: ['#hocmoingay', '#xuhuong', '#trending'],
      musicBackground: '/logos/music-background.png',
      backgroundMusic: '无敌小可爱 - 叶雨岑',
      videoUrl: 'url-to-video-2',
    },
  ];

  return (
    <div style={{ marginTop: '60px' }}>
      <div className="element-right">
        <div className="wrap-list-video">
          {videoData.map((video, index) => (
            <VideoItem key={index} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ElementRight;
