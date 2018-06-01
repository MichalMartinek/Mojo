/* @flow */
import React from 'react'
import { firebaseConnect,  withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux'
import {connect }from 'react-redux'
import PlayBar from './PlayBar'
import YouTube from 'react-youtube'
import * as constants from './constants'

class PlayBarContainer extends React.Component<{}> {
  state = {
    player: null,
  }
  componentDidMount() {
    this.update({state: constants.PAUSED})
  }
  update = (obj) => {
    return this.props.firebase.ref().child(`/playlists/${this.props.playlistId}/position`).update(obj);
  }
  play() {
    if (!this.state.player) return;
    this.state.player.playVideo()
  }
  pause() {
    if (!this.state.player) return;
    this.state.player.pauseVideo()
  }
  playOrPause = () => {
    if (!this.state.player) return
    const {playlist} = this.props
    // Add some video from playlist, if none is assigned
    if(playlist.position.state === constants.PAUSED && !playlist.position.video) {
      if (playlist.videos && Object.keys(playlist.videos).length > 0) {
        this.update({video: Object.keys(playlist.videos)[0]})
      } else {
        return
      }
    }
    if (playlist.position.state === constants.PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }
  onPlayerReady = (event) => {
    this.setState({
      player: event.target,
    });
  }
  onPlayerChange = (event) => {
    console.log(event)
    switch (event.data) {
      case -1:
        //Not started
        break;
      case 0:
        //Ended
        break;
      case 1:
        //Playing
        this.update({state: constants.PLAYING})
        break;
      case 2:
        //Paused
        this.update({state: constants.PAUSED})
        break;
      case 3:
        //Loading
        break;
      case 5:
        // Cued
        if (this.props.playlist.position.state === constants.PLAYING) {
          this.play()
        }
        break;
    }
  }
  render() {
    const { playlist } = this.props
    const video = playlist.videos && playlist.videos[playlist.position.video] || {}
    console.log(playlist);
    return (
      <div className="playBarContainer">
        <PlayBar
          title={'Title'}
          author={'Author'}
          mainButtonClick={this.playOrPause}
          paused={playlist.position.state === constants.PAUSED}
          preview={
            <YouTube
              videoId={video.id}
              opts={{
                playerVars: { // https://developers.google.com/youtube/player_parameters
                  autoplay: 0,
                  controls: 0,
                }
              }}
              onReady={this.onPlayerReady}
              onStateChange={this.onPlayerChange}
              onError={(e)=> {console.log('onError',e);}}
            />
          }
        />
      </div>
    );
  }
}
export default compose(
  withFirebase,
  connect(
    (state, props) => ({
      playlist: state.firebase.data.playlists[props.playlistId],
    })
  )
)(PlayBarContainer)
