// @flow
import React from 'react'
import PlayBar from './PlayBar'
import type { Player, Playlist } from "./types";
import YouTube from 'react-youtube'
import * as constants from './constants'

type Props = {
  playlist: Playlist,
  node: {
    update: (obj: {}) => void
  },
}

type State = {
  player: null | Player
};

class PlayBarContainer extends React.Component<Props, State> {
  state = {
    player: null,
  }
  componentDidMount() {
    this.update({state: constants.PAUSED})
  }
  update = (obj: {}) => {
    return this.props.node.update(obj);
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
  onPlayerReady = (event: {target: Player}) => {
    this.setState({
      player: event.target,
    });
  }
  onPlayerChange = (event: {data: number}) => {
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
      default:
    }
  }
  render() {
    const { playlist } = this.props
    const video = (playlist.videos && playlist.videos[playlist.position.video]) || {}
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
                  showinfo: 0,
                  rel:0,
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
export default PlayBarContainer
