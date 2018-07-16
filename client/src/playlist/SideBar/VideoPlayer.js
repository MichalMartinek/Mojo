// @flow
import React from 'react'
import YouTube from 'react-youtube'
import type { Player, Playlist } from "../types";
import {nextVideo, previousVideo} from "../helpers";
import * as constants from '../constants'

type Props = {
  playlist: Playlist,
  node: {
    update: (obj: {}) => void
  },
}

type State = {
  player: null | Player,
  volume: number,
};

class VideoPlayer extends React.Component<Props, State> {
  state = {
    player: null,
    volume: 50,
  }
  componentDidMount() {
    this.update({state: constants.PAUSED})
  }
  update = (obj: {}) => {
    return this.props.node.update(obj);
  }
  play() {
    if (this.state.player) this.state.player.playVideo()
  }
  pause() {
    if (this.state.player) this.state.player.pauseVideo()
  }
  changeVolume = (volume: number) => {
    this.setState({volume})
    if (this.state.player) this.state.player.setVolume(volume)
  }
  playOrPause = () => {
    const {playlist} = this.props
    if (!this.state.player || !playlist.position.video) return
    if (playlist.position.state === constants.PLAYING) {
      this.pause()
    } else {
      this.play()
    }
  }
  nextVideo = () => {
    this.update(nextVideo(this.props.playlist))
  }
  previousVideo = () => {
    this.update(previousVideo(this.props.playlist))
  }
  onPlayerReady = (event: {target: Player}) => {
    this.setState({
      player: event.target,
    });
  }
  onPlayerChange = (event: {data: number}) => {
    console.log(event)
    switch (event.data) {
      case -1: //Not started
         break;
      case 0: //Ended
        this.nextVideo()
        break;
      case 1: //Playing
        this.update({state: constants.PLAYING})
        break;
      case 2: //Paused
        this.update({state: constants.PAUSED})
        break;
      case 3: //Loading
        break;
      case 5: // Cued
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
    return (
      <YouTube
        videoId={video.id}
        opts={{
          playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: playlist.position.state === constants.PLAYING,
            controls: 0,
            showinfo: 0,
            rel:0,
          }
        }}
        onReady={this.onPlayerReady}
        onStateChange={this.onPlayerChange}
        onError={(e)=> {console.log('onError',e);}}
      />
    );
  }
}
export default VideoPlayer
