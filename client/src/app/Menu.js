import React from 'react';
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__item--logo">
          <Link to="/">Mojo</Link>
        </div>
        <div className="menu__item">
          <Link to="/login">Login</Link>
        </div>
        <div className="menu__item">
          <Link to="/Profile">Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
