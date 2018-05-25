/* @flow */

import React from 'react';
import { firebaseConnect,  withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";
import YouTube from 'react-youtube';
import Playlist from './Playlist';

class PlaylistView extends React.Component<{}> {
  render() {
    console.log(this.props.match.params.id)
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      <div className="App">
        test
        <Playlist playlistId={this.props.match.params.id} />
      </div>
    );
  }
}

export default PlaylistView
