// @flow
import React from 'react';
import PlayBar from './PlayBar';
import type { NextPreviousAction, Playlist, PlayPauseAction } from '../types';
import * as constants from '../constants';
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
  actions: {
    setVolume: (volume: number) => void
  },
  firebaseActions: {
    play: PlayPauseAction,
    pause: PlayPauseAction,
    next: NextPreviousAction,
    previous: NextPreviousAction
  }
};

class PlayBarContainer extends React.Component<Props> {
  playOrPause = () => {
    const { playlist, firebaseActions, id } = this.props;
    if (playlist.position.state === constants.PLAYING) {
      firebaseActions.pause(id);
    } else {
      firebaseActions.play(id);
    }
  };

  render() {
    const { playlist, volume, actions, firebaseActions, id } = this.props;
    const video =
      (playlist.videos && playlist.videos[playlist.position.video]) || {};
    return (
      <div className="playBarContainer">
        <PlayBar
          title={video.title}
          author={video.channelTitle}
          mainButtonClick={this.playOrPause}
          nextButtonClick={() => {
            firebaseActions.next(
              id,
              playlist,
              playlist.position.state === constants.PLAYING
            );
          }}
          previousButtonClick={() => {
            firebaseActions.previous(
              id,
              playlist,
              playlist.position.state === constants.PLAYING
            );
          }}
          paused={playlist.position.state === constants.PAUSED}
          volume={volume}
          changeVolume={actions.setVolume}
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
  )(PlayBarContainer)
);
