import React from 'react';
import ActionViewer from './ActionViewr';
import Video from './Video';

const VideoItem = ({ avatar, userId, userName, details, hashtags, musicBackground, backgroundMusic, videoUrl }) => {
  return (
    <div className="item-video">
      <div className="avatar-user">
        <div className="div-avatar-user">
          <span>
            <img src={avatar} alt="name-user" />
          </span>
        </div>
      </div>
      <div className="infor-video">
        <div className="name-and-cap">
          <div className="infor-user">
            <div>
              <h3 className="id-user">{userId}</h3>
              <h4 className="name-user">{userName}</h4>
              <span>.</span>
              {details}
            </div>
          </div>
          <div className="father-cap-and-hashtag">
            <div className="cap-and-hashtag">
              <div>
                {hashtags.map((tag, index) => (
                  <React.Fragment key={index}>
                    <div className="link-hashtag">{tag}</div>
                    {index !== hashtags.length - 1 && <span> </span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <h4 className="background-music">
            <div className="link-music-background">
              <img alt="music" src={musicBackground} />
              {backgroundMusic}
            </div>
          </h4>
        </div>
        <div className="display-and-func-video">
          <Video videoUrl={videoUrl} />
          <ActionViewer />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
