import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../app/routes';
import withLayout from '../common/withLayout';

export default withLayout(() => (
  <div className="home">
    <div className="home__header">
      <div className="home__textContainer">
        <h1 className="home__title">
          Share playlists of Youtube videos easily
        </h1>
        <h2 className="home__tagline">
          Create a playlist and send a link to friends for synced playlist
        </h2>
        <Link className="button home__button" to={routes.newPlaylist}>
          Create new playlist
        </Link>
      </div>
    </div>
  </div>
));
