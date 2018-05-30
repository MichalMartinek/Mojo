/* @flow */
import React from 'react'
import { firebaseConnect,  withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux'
import {connect }from 'react-redux'
import PlayBar from './PlayBar'
import YouTube from 'react-youtube'
import * as constants from './constants'

class PlayBarContainer extends React.Component<{}> {
  update = (obj) => {
    return this.props.firebase.ref().child(`/playlists/${this.props.playlistId}/position`).update(obj);
  }
  playOrPause = () => {
    const {playlist} = this.props
    const update = {}
     if(playlist.position.state === constants.PAUSED) {
       if (!playlist.position.video) {
         if (playlist.videos && Object.keys(playlist.videos).length > 0) {
          update.video = Object.keys(playlist.videos)[0]
          } else {
            return;
          }
       }
     }
    update.state = playlist.position.state === constants.PLAYING ? constants.PAUSED : constants.PLAYING
    console.log(update)
    this.update(update)
  }
  render() {
    const { playlist } = this.props
    console.log(playlist);
    return (
      <div className="playbar">
        <button onClick={this.playOrPause}>
          {playlist.position.state === constants.PLAYING ? 'STOP': 'PLAY'}
        </button>
        <button>>></button>
        <div className="youtubeContainer">
          {playlist.position.video &&
            <YouTube
              videoId={playlist.videos[playlist.position.video].id}
              className="player"
              opts={{
                height: '390',
                width: '640',
                playerVars: { // https://developers.google.com/youtube/player_parameters
                  autoplay: 0,
                  controls: 0,
                }
              }}                        // defaults -> {}
              onReady={(e)=> {console.log('onReady', e);}}                        // defaults -> noop
              onPlay={(e)=> {console.log('onPlay', e);}}                         // defaults -> noop
              onPause={(e)=> {console.log('onPause',e);}}                        // defaults -> noop
              onEnd={(e)=> {console.log('onEnd',e);}}                         // defaults -> noop
              onError={(e)=> {console.log('onError',e);}}                       // defaults -> noop
              onStateChange={(e)=> {console.log('onStateChange',e);}}              // defaults -> noop
            />
          }
        </div>
        <PlayBar title={'Title'} author={'Author'} preview={({className})=> <div  className={className} style={{backgroundColor: 'red'}}/>}/>
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
