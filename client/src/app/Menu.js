import React from 'react';
import { Link } from 'react-router-dom';
import routes from './routes';

type Props = {
  isAuthenticated: boolean,
  loading: boolean
};

const Menu = ({ isAuthenticated, loading }: Props) => {
  return (
    <div className="menu">
      <div className="menu__left">
        <Link to="/" className="menu__logo">
          Mojo
        </Link>
      </div>
      <div className="menu__controls">
        {!loading &&
          (isAuthenticated ? (
            <Link className="menu__button" to={routes.profile}>
              Profile
            </Link>
          ) : (
            <Link className="menu__button" to={routes.login}>
              Log in
            </Link>
          ))}

        <Link className="menu__button" to={routes.newPlaylist}>
          New playlist
        </Link>
      </div>
    </div>
  );
};

export default Menu;
