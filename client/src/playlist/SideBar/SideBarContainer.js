// @flow
import React from 'react';
import type {
  DeleteVideoAction,
  Playlist,
  SetNameFieldAction,
  UpdatePlaylistAction,
  UpdatePositionAction
} from '../types';
import { bindActionCreators } from 'redux';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import PlaylistVideos from './PlaylistVideos';
import PlaylistHeader from './SideBarHeader';
import VideoPlayer from './VideoPlayer';
import * as actions from '../actions';
import { bindFirebaseActions } from '../../utils/bindFirebaseActions';
import * as firebaseActions from '../firebaseActions';

type Props = {
  id: string,
  playlist: Playlist,
  volume: number,
  title: string,
  className: string,
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
  static defaultProps = {
    className: ''
  };
  componentDidMount() {
    this.props.actions.setNameField(this.props.playlist.title);
  }
  render() {
    const {
      playlist,
      className,
      title,
      firebaseActions,
      actions,
      id
    } = this.props;
    return (
      <div className={`sidebar ${className}`}>
        <PlaylistHeader
          playlist={playlist}
          title={title}
          handleTitleChange={title => {
            actions.setNameField(title);
            firebaseActions.updatePlaylist(id, { title });
          }}
        />
        <PlaylistVideos
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
        />
        <VideoPlayer id={id} />
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
