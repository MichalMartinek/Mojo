import React from 'react';
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__item">
        <Link to="/">App</Link>
      </div>
      <div className="menu__item">
        <Link to="/login">Login</Link>
      </div>
      <div className="menu__item">
        <Link to="/settings">Settings</Link>
      </div>
      <div className="menu__item">
        <Link to="/playlist">Playlist</Link>
      </div>
    </div>
  );
}

export default Menu;
