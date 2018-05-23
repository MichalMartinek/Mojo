import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__item">
        <Link to="/app">Profile</Link>
      </div>
      <div className="sidebar__item">
        <Link to="/list">List</Link>
      </div>
      <div className="sidebar__item">
        <Link to="/preview">Preview</Link>
      </div>
    </div>
  );
}

export default Sidebar;
