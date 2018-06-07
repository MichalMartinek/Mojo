/* @flow */

import React, {Fragment} from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import  search from "youtube-search";
import PlayBarContainer from './PlayBarContainer'
import PlaylistComponent from './Playlist'
import type {Playlist, Video} from "./types";
import Search from "./Search";

type Props = {
  playlistId: string,
  playlists: { [string]: Playlist },
  firebase: any,
}

type State = {
  results: null | Array<Video>
}
class PlaylistContainer extends React.Component<Props, State> {
  state = {
    results: null,
  }
  handleAdd = async (item) => {
    if (item) {
      const playlist = this.props.playlists[this.props.playlistId]
      const addedVideo = await this.props.firebase.push(`playlists/${this.props.playlistId}/videos`, item)
      const newOrder = playlist.order ? [...playlist.order, addedVideo.key]: [addedVideo.key]
      return this.props.firebase.update(`playlists/${this.props.playlistId}`, {order: newOrder})
    }
  }
  handleChangeOrder = (order) => {
    return this.props.firebase.update(`playlists/${this.props.playlistId}`, {order})
  }
  handleSearch = (text) => {
    const opts = {
      maxResults: 10,
      key: 'AIzaSyCA88Ye6O5jP-4DtQz1Ap5SsJ_Z0orYixc',
      type: 'video',
    };

    search(text, opts, (err, results, pageInfo) => {
      if(err) return console.log(err);
      this.setState({results})
    });
  }
  render() {
    if (!this.props.playlists || !this.props.playlists[this.props.playlistId]) {
      return <div>
        Loading or not found
      </div>
    }
    const playlist = this.props.playlists[this.props.playlistId]
    if (!playlist.videos) playlist.videos = {} // Because Firebase can't store empty objects
    return (
      <Fragment>
        <div className="playlistContainer">
          <div className="playlistContainer__playlist">
            <PlaylistComponent
              playlist={playlist}
              itemClick={(e)=>{console.log(e)}}
              changeOrder={this.handleChangeOrder}
              totalTime={{ hours: 3, minutes: 45}}/>
          </div>
          <div className="playlistContainer__search">
            <Search itemClick={(id)=> this.handleAdd(id)} result={this.state.results} searchHandle={this.handleSearch}/>
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
    (state) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistContainer)
