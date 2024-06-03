import React, { useRef, useEffect, useState } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import CommentsModal from './CommentsModal'; // Importamos el componente CommentsModal
import './VideoCard.css';

const VideoCard = (props) => {
  const { url, username, description, song, likes, comments, profilePic, setVideoRef, autoplay, commentList, onCommentsToggle } = props;
  const videoRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [videoComments, setVideoComments] = useState(commentList); // Estado para almacenar los comentarios del video

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

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
    onCommentsToggle(newShowComments); // Notificar al componente padre sobre el estado de los comentarios
  };

  // Función para agregar un nuevo comentario al video
  const addComment = (newComment) => {
    setVideoComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="video">
      {/* El elemento de video */}
      <video
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
          {/* La parte izquierda del contenedor */}
          <FooterLeft username={username} description={description} song={song} />
        </div>
        <div className="footer-right">
          {/* La parte derecha del contenedor */}
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
      {/* Modal de comentarios */}
      {showComments && (
        <CommentsModal 
          comments={videoComments} // Pasamos la lista de comentarios actualizada al modal
          onClose={toggleComments} // Pasamos la función para cerrar el modal
          onCommentSubmit={addComment} // Pasamos la función para agregar comentarios
        />
      )}
    </div>
  );
};

export default VideoCard;
