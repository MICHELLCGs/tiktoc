import React, { useRef, useState, useEffect } from 'react';
import '../styles/CommentsModal.css';

function CommentsModal({ comments = [], onClose }) {
  const modalRef = useRef(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Cerrar el modal si se hace clic fuera de él
      }
    };

    // Agregar el evento de click al documento
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Limpiar el evento al desmontar el componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Aquí puedes enviar el nuevo comentario al backend o realizar cualquier acción que necesites
    console.log('Nuevo comentario:', newComment);
    // Limpia el campo de texto después de enviar el comentario
    setNewComment('');
  };

  return (
    <div className="comments-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content" ref={modalRef}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>
              <strong>{comment.user}</strong>: {comment.text}
            </li>
          ))}
        </ul>
        <div className="new-comment">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Escribe un nuevo comentario..."
            rows={3}
          ></textarea>
          <button onClick={handleCommentSubmit}>Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;
