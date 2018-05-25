/* @flow */

import React from 'react';
import { firebaseConnect,  withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";
import YouTube from 'react-youtube';

type State = {
  results: Array<{
    id: string,
    title: string,
  }>
}
class PlaylistView extends React.Component<{}, State> {
  state = {
    results: []
  }
  handleAdd = () => {
    var opts = {
      maxResults: 10,
      key: 'AIzaSyCA88Ye6O5jP-4DtQz1Ap5SsJ_Z0orYixc'
    };

    search(this.input.value, opts, (err, results, pageInfo) => {
      if(err) return console.log(err);
      this.setState({results})
      console.log(results);
      console.log(this.state);
      this.input.value = ''
    });
  }
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  render() {
    console.log(this.props)
    const {results} = this.state;
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Home</h1>
          <h2>Search</h2>

          <input type='text' ref={ref => { this.input = ref }} />
          <button onClick={this.handleAdd}>
            Search
          </button>
          {
            this.state.results.map((i) => (
             <div key={i.id}>
               {i.title}
               <YouTube
                videoId={i.id}
                opts={opts}
                onReady={this._onReady}
              />
             </div>
           ))
          }
        </header>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  connect(
    (state) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistView)
