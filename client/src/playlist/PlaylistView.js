/* @flow */

import React from 'react';
import PlaylistContainer from './PlaylistContainer';

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
      <div className="App">
        <PlaylistContainer playlistId={this.props.match.params.id} />
      </div>
    );
  }
}

export default PlaylistView
