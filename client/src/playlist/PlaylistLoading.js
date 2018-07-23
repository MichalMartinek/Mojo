import React, { Fragment } from 'react';
import Spinner from '../common/Spinner';

const PlaylistLoading = () => (
  <Fragment>
    <div className="playlistContainer">
      <div className="playlistContainer__sidebar sidebar" />
      <div className="playlistContainer__search playlistContainer__search--loading">
        <Spinner />
      </div>
    </div>
    <div className="playBarContainer">
      <div className="playBar" />
    </div>
  </Fragment>
);

export default PlaylistLoading;
