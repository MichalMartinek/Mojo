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
  player: null | Player,
  volume: number,
};

class PlayBarContainer extends React.Component<Props, State> {
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
    if (!this.state.player) return;
    this.state.player.playVideo()
  }
  pause() {
    if (!this.state.player) return;
    this.state.player.pauseVideo()
  }
  changeVolume = (volume: number) => {
    this.setState({volume})
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
  nextVideo = () => {
    const {playlist} = this.props
    const position = playlist.order.indexOf(playlist.position.video)
    const newPosition = position + 1 === playlist.order.length ? 0 : position + 1
    console.log(position, newPosition)
    this.update({video: playlist.order[newPosition]})
  }
  previousVideo = () => {
    const {playlist} = this.props
    const position = playlist.order.indexOf(playlist.position.video)
    const newPosition = position === 0 ? playlist.order.length - 1 : position - 1
    console.log(position, newPosition)
    this.update({video: playlist.order[newPosition]})
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
    console.log(this.props)
    const { playlist } = this.props
    const { volume } = this.state
    const video = (playlist.videos && playlist.videos[playlist.position.video]) || {}
    return (
      <div className="playBarContainer">
        <PlayBar
          title={video.title}
          author={video.channelTitle}
          mainButtonClick={this.playOrPause}
          nextButtonClick={this.nextVideo}
          previousButtonClick={this.previousVideo}
          paused={playlist.position.state === constants.PAUSED}
          volume={volume}
          changeVolume={this.changeVolume}
          preview={
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
          }
        />
      </div>
    );
  }
}
export default PlayBarContainer
