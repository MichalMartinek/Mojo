/* @flow */

import React from 'react';
import {
  firebaseConnect,
  populate,
  isLoaded,
  isEmpty
} from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../common/firebaseActions';
import type { PopulateProfile } from './types';
import type { Firebase } from '../common/types';
import PlaylistsItem from './PlaylistsItem';

type Props = {
  profile: PopulateProfile,
  id: string,
  firebase: Firebase
};

class Playlists extends React.Component<Props> {
  renderContent() {
    const { profile } = this.props;
    if (!isLoaded(profile) || isEmpty(profile)) {
      return <div className="playlists__status">Loading</div>;
    }
    if (!profile.playlists) {
      return <div className="playlists__status">No playlists found</div>;
    }
    const { playlists } = profile;
    return (
      <div className="playlists__container">
        {Object.keys(playlists).map(
          (key: string) =>
            playlists[key] ? (
              <PlaylistsItem
                key={key}
                id={key}
                playlist={playlists[key]}
                onDelete={() => {
                  actions.deletePlaylist(this.props.firebase, key, playlists);
                }}
              />
            ) : null
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="playlists">
        <h4 className="playlists__header">Playlists</h4>
        {this.renderContent()}
      </div>
    );
  }
}
const populates = [{ child: 'playlists', root: 'playlists' }];

export default compose(
  firebaseConnect(props => {
    return [{ path: `users/${props.id}`, populates }];
  }),
  connect((state, props) => ({
    profile: populate(state.firebase, `users/${props.id}`, populates)
  }))
)(Playlists);
