import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../app/routes';
import SearchFormContainer from './Search/SearchFormContainer';

type Props = {
  isAuthenticated: boolean,
  loading: boolean
};

const CustomMenu = ({ isAuthenticated, loading }: Props) => {
  return (
    <div className="menu playlistMenu">
      <div className="menu__left playlistMenu__left">
        <Link to="/" className="menu__logo playlistMenu__logo">
          Mojo
        </Link>
      </div>
      <div className="playlistMenu__right">
        <SearchFormContainer />
        <div className="menu__controls playlistMenu__controls">
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
    </div>
  );
};

export default CustomMenu;
