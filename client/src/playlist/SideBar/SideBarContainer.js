// @flow
import React from 'react';
import type {
  DeleteVideoAction,
  Playlist,
  UpdatePlaylistAction,
  UpdatePositionAction
} from '../types';
import PlaylistComponent from './Playlist';
import { bindActionCreators } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { bindFirebaseActions } from '../../utils/bindFirebaseActions';
import * as firebaseActions from '../firebaseActions';

type Props = {
  id: string,
  playlist: Playlist,
  volume: number,
  firebaseActions: {
    updatePlaylist: UpdatePlaylistAction,
    updatePosition: UpdatePositionAction,
    deleteVideo: DeleteVideoAction
  }
};

class SideBarContainer extends React.Component<Props> {
  render() {
    const { playlist, firebaseActions, id } = this.props;
    const video =
      (playlist.videos && playlist.videos[playlist.position.video]) || {};
    return (
      <div className="playlistContainer__playlist">
        <PlaylistComponent
          playlist={playlist}
          itemOpen={key => {
            firebaseActions.updatePosition(id, { video: key });
          }}
          itemDelete={videoId => {
            firebaseActions.deleteVideo(id, playlist, videoId);
          }}
          changeOrder={order => {
            firebaseActions.updatePlaylist(id, { order });
          }}
          handleTitleChange={title => {
            firebaseActions.updatePlaylist(id, { title });
          }}
        />
      </div>
    );
  }
}
export default withFirebase(
  connect(
    (state, props) => ({
      playlist: state.firebase.data.playlists[props.id],
      volume: state.playlist.volume
    }),
    dispatch => ({
      actions: bindActionCreators(actions, dispatch)
    }),
    (stateProps, dispatchProps, ownProps) => {
      const boundFirebaseActions = bindFirebaseActions(
        ownProps.firebase,
        firebaseActions
      );
      return Object.assign({}, ownProps, stateProps, dispatchProps, {
        firebaseActions: boundFirebaseActions
      });
    }
  )(SideBarContainer)
);
