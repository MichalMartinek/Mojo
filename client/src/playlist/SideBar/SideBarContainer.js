// @flow
import React from 'react';
import type {
  DeleteVideoAction,
  Playlist,
  SetNameFieldAction,
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
  title: string,
  firebaseActions: {
    updatePlaylist: UpdatePlaylistAction,
    updatePosition: UpdatePositionAction,
    deleteVideo: DeleteVideoAction
  },
  actions: {
    setNameField: (value: string) => SetNameFieldAction
  }
};

class SideBarContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.actions.setNameField(this.props.playlist.title);
  }
  render() {
    const { playlist, title, firebaseActions, id } = this.props;
    return (
      <div className="playlistContainer__playlist">
        <PlaylistComponent
          playlist={playlist}
          title={title}
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
      volume: state.playlist.volume,
      title: state.playlist.name
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
