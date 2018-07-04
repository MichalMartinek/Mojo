import React from 'react';
import { Link } from "react-router-dom";

type Props = {
  isAuthenticated: boolean,
  loading: boolean,
};

const Menu = ({ isAuthenticated, loading } : Props) => {
  console.log(loading)
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__item--logo">
          <Link to="/">Mojo</Link>
        </div>
        {!loading && (
        isAuthenticated ?
          <div className="menu__item">
            <Link to="/Profile">Profile</Link>
          </div>
          :
          <div className="menu__item">
            <Link to="/login">Login</Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default Menu;
