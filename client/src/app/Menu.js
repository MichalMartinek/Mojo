import React from 'react';
import { Link } from "react-router-dom";
import routes from './routes'

type Props = {
  isAuthenticated: boolean,
  loading: boolean,
};

const Menu = ({ isAuthenticated, loading } : Props) => {
  console.log(loading)
  return (
    <div className="menu">
      <div className="menu__container">
        <div className="menu__controls menu__controls--first">
          {/*TBD*/}
        </div>
        <div className="menu__logo">
          <Link to="/">Mojo</Link>
        </div>
        <div className="menu__controls">
          {!loading && (
            isAuthenticated ?
                <Link className="button menu__button" to={routes.profile}>Profile</Link>
              :
                <Link className="button menu__button" to={routes.login}>Log in</Link>
          )}

          <Link className="button menu__button" to={routes.newPlaylist}>New playlist</Link>
        </div>


      </div>
    </div>
  );
}

export default Menu;
