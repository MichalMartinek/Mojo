/* @flow */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";
import PlayBarContainer from './PlayBarContainer'
import type {Playlist} from "./types";

type Props = {
  playlistId: string,
  playlists: { [string]: Playlist },
  firebase: any,
}

type State = {
  results: Array<{
    id: string,
    title: string,
  }>
}
class PlaylistContainer extends React.Component<Props, State> {
  state = {
    results: []
  }
  handleAdd = (id) => {
    return this.props.firebase.push(`playlists/${this.props.playlistId}/videos`, id)
  }
  handleSearch = () => {
    var opts = {
      maxResults: 10,
      key: 'AIzaSyCA88Ye6O5jP-4DtQz1Ap5SsJ_Z0orYixc',
      type: 'video',
      part: 'contentDetails'
    };

    search(this.input.value, opts, (err, results, pageInfo) => {
      if(err) return console.log(err);
      console.log(results)
      this.setState({results})
      this.input.value = ''
    });
  }
  render() {
    if (!this.props.playlists || !this.props.playlists[this.props.playlistId]) {
      return <div>
        Loading or not found
      </div>
    }
    const {results} = this.state
    const playlist = this.props.playlists[this.props.playlistId]
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Playlist {playlist.title}</h1>
          <h2>Search</h2>
          <input type='text' ref={ref => { this.input = ref }} />
          <button onClick={this.handleSearch}>
            Search
          </button>
          {
            this.state.results.map((i) => (
             <div key={i.id}>
               {i.title}
               <img src={i.thumbnails.medium.url} />
               <button onClick={()=>this.handleAdd(i)}>
                 Add
               </button>
             </div>
           ))
          }
        </header>
        <div>
          <h2>Videos</h2>
          { playlist.videos &&
            Object.keys(playlist.videos).map((key) => {
              const i = playlist.videos[key]
              return (
             <div key={i.id}>
               {i.title}
               <img src={i.thumbnails.medium.url} />
             </div>
           )})
          }
        </div>
        <PlayBarContainer
          playlist={playlist}
          node={this.props.firebase.ref().child(`/playlists/${this.props.playlistId}/position`)}
        />
      </div>
    );
  }
}
export default compose(
    firebaseConnect((props) => [
      { path: `playlists/${props.playlistId}` } // string equivalent 'todos'
    ]),
  connect(
    (state, props) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistContainer)
