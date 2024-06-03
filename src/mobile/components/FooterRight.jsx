import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleCheck, faHeart, faCommentDots, faBookmark, faShare } from '@fortawesome/free-solid-svg-icons';
import CommentsModal from './CommentsModal';
import './FooterRight.css';

function FooterRight({ likes, comments, profilePic, commentList, isCurrentVideo }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userAddIcon, setUserAddIcon] = useState(faCirclePlus);
  const [showModal, setShowModal] = useState(false);

  const handleUserAddClick = () => {
    setUserAddIcon(faCircleCheck);
    setTimeout(() => {
      setUserAddIcon(null);
    }, 3000);
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const handleCommentClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!isCurrentVideo) {
      closeModal();
    }
  }, [isCurrentVideo]);

  const parseLikesCount = (count) => {
    if (typeof count === 'string') {
      if (count.endsWith('K')) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  return (
    <div className="footer-right">
      <div className="sidebar-icon">
        {profilePic ? (
          <img src={profilePic} className='userprofile' alt='Profile' style={{ width: '45px', height: '45px', color: '#616161' }} />
        ) : null}
        <FontAwesomeIcon icon={userAddIcon} className='useradd' style={{ width: '15px', height: '15px', color: '#FF0000' }} onClick={handleUserAddClick} />
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon
          icon={faHeart}
          style={{ width: '35px', height: '35px', color: liked ? '#FF0000' : 'white' }}
          onClick={handleLikeClick}
        />
        <p>{formatLikesCount(parseLikesCount(likes) + (liked ? 1 : 0))}</p>
      </div>
      <div className="sidebar-icon">
        <FontAwesomeIcon icon={faCommentDots} style={{ width: '35px', height: '35px', color: 'white' }} onClick={handleCommentClick} />
        <p>{comments}</p>
      </div>
      <div className="sidebar-icon record">
        <img src="https://static.thenounproject.com/png/934821-200.png" alt='Record Icon' />
      </div>
      {showModal && <CommentsModal comments={commentList} onClose={closeModal} />}
    </div>
  );
}

export default FooterRight;
