/* @flow */

import React from 'react';
import Spinner from '../common/Spinner';

type Props = {
  match: {
    params: {
      id: string
    }
  }
};
class PlaylistView extends React.Component<Props> {
  render() {
    return (
      <div className="newPlaylist">
        <Spinner />
        <h3>Creating new playlist</h3>
      </div>
    );
  }
}

export default PlaylistView
