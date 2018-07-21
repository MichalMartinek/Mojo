// @flow
import React from 'react';
import YouTube from 'react-youtube';
import type {
  NextPreviousAction,
  Player,
  Playlist,
  PlayPauseAction
} from '../types';
import { withFirebase } from 'react-redux-firebase';
import * as constants from '../constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as firebaseActions from '../firebaseActions';
import { bindFirebaseActions } from '../../utils/bindFirebaseActions';

type Props = {
  id: string,
  volume: number,
  playlist: Playlist,
  firebaseActions: {
    play: PlayPauseAction,
    pause: PlayPauseAction,
    next: NextPreviousAction
  }
};

type State = {
  player: null | Player
};

class VideoPlayer extends React.Component<Props, State> {
  state = {
    player: null
  };
  componentDidUpdate(prevProps) {
    if (!this.state.player) return;
    const {
      playlist: { position }
    } = this.props;
    const prevPosition = prevProps.playlist.position;
    if (
      position.state === constants.PLAYING &&
      prevPosition.state !== constants.PLAYING
    ) {
      this.play();
    } else if (
      position.state === constants.PAUSED &&
      prevPosition.state !== constants.PAUSED
    ) {
      this.pause();
    }
  }
  play() {
    if (this.state.player) this.state.player.playVideo();
  }
  pause() {
    if (this.state.player) this.state.player.pauseVideo();
  }
  playOrPause = () => {
    const { playlist } = this.props;
    if (!this.state.player || !playlist.position.video) return;
    if (playlist.position.state === constants.PLAYING) {
      this.pause();
    } else {
      this.play();
    }
  };
  onPlayerReady = (event: { target: Player }) => {
    this.setState({
      player: event.target
    });
    if (this.props.playlist.position.state === constants.PLAYING) {
      this.play();
    }
  };
  onPlayerChange = (event: { data: number }) => {
    console.log(event);
    const { firebaseActions, id, playlist } = this.props;
    switch (event.data) {
      case -1: //Not started
        break;
      case 0: //Ended
        firebaseActions.next(
          id,
          playlist,
          playlist.position.state === constants.PLAYING
        );
        break;
      case 1: //Playing
        firebaseActions.play(id);
        break;
      case 2: //Paused
        firebaseActions.pause(id);
        break;
      case 3: //Loading
        break;
      case 5: // Cued
        if (
          playlist.position.state === constants.PLAYING ||
          playlist.position.switchingSongs
        ) {
          this.play();
        }
        break;
      default:
    }
  };
  render() {
    const { playlist } = this.props;
    const video =
      (playlist.videos && playlist.videos[playlist.position.video]) || {};
    return (
      <YouTube
        videoId={video.id}
        opts={{
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: playlist.position.state === constants.PLAYING,
            controls: 0,
            showinfo: 0,
            rel: 0
          }
        }}
        onReady={this.onPlayerReady}
        onStateChange={this.onPlayerChange}
        onError={e => {
          console.log('onError', e);
        }}
      />
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
  )(VideoPlayer)
);
