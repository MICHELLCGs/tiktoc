import React from 'react';
import { Link } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUserFriends, faPlus, faInbox, fa7,faUser } from '@fortawesome/free-solid-svg-icons';

function BottomNavbar() {
  return (
      <div className="bottom-navbar">
        <Link to="/" className="nav-item">
          <FontAwesomeIcon icon={faHouse} className="icon active" />
          <span className="item-name active">Inicio</span>
        </Link>
        <div className="nav-item">
          <FontAwesomeIcon icon={faPlus} className="icon plus" />
          <span className="item-name">Crear</span>
        </div>
        <Link to="/perfil" className="nav-item">
          <FontAwesomeIcon icon={faUser} className="icon" />
          <span className="item-name">Perfil</span>
        </Link>
      </div>
  );
}

export default BottomNavbar;
