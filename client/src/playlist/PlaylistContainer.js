/* @flow */

import React, {Fragment} from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";
import PlayBarContainer from './PlayBarContainer'
import PlaylistComponent from './Playlist'
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
      <Fragment>
        <div className="playlistContainer">
          <div className="playlistContainer__playlist">
            <PlaylistComponent playlist={playlist} itemClick={(e)=>{console.log(e)}} totalTime={{ hours: 3, minutes: 45}}/>
          </div>
          <div className="playlistContainer__search">
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
          </div>
        </div>
        <PlayBarContainer
          playlist={playlist}
          node={this.props.firebase.ref().child(`/playlists/${this.props.playlistId}/position`)}
        />
      </Fragment>
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
