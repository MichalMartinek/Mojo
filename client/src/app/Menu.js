import React from 'react';
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <div className="menu">
      <div className="menu__item">
        <Link to="/app">App</Link>
      </div>
      <div className="menu__item">
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
}

export default Menu;
