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
  results: null | Array<Video>,
  nextPage: ?string,
}
//TODO: refactor handle methods and handle errors
class PlaylistContainer extends React.Component<Props, State> {
  state = {
    results: null,
    nextPage: undefined,
  }
  handleAdd = async (item) => {
    if (item) {
      const playlist = this.props.playlists[this.props.playlistId]
      const addedVideo = await this.props.firebase.push(`playlists/${this.props.playlistId}/videos`, item)
      const newOrder = playlist.order ? [...playlist.order, addedVideo.key]: [addedVideo.key]
      return this.props.firebase.update(`playlists/${this.props.playlistId}`, {order: newOrder})
    }
  }
  changeOrder = (order) => {
    return this.props.firebase.update(`playlists/${this.props.playlistId}`, {order})
  }
  handleDelete = async (id) => {
    const playlist = this.props.playlists[this.props.playlistId]
    const index = playlist.order.indexOf(id)
    if (index > -1) {
      if (playlist.position.video === id) {
        const video = playlist.order[index < playlist.order.length ? index + 1 : 0]
        await this.props.firebase.update(`/playlists/${this.props.playlistId}/position`, {video})
      }
      const newOrder = [...playlist.order]
      newOrder.splice(index, 1)
      await this.changeOrder(newOrder);
    }
    return this.props.firebase.ref().child(`playlists/${this.props.playlistId}/videos/${id}`).remove()
  }
  handleSearch = (text, nextPage) => {
    const opts = {
      maxResults: 10,
      key: 'AIzaSyCA88Ye6O5jP-4DtQz1Ap5SsJ_Z0orYixc',
      type: 'video',
      pageToken: undefined,
    };

    if (nextPage) opts.pageToken = this.state.nextPage

    search(text, opts, (err, newPage, pageInfo) => {
      if(err) return console.log(err);
      const results = nextPage && this.state.results ? [...this.state.results, ...newPage] : newPage
      this.setState({results, nextPage: pageInfo.nextPageToken})
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
    if (!playlist.order) playlist.order = [] // Because Firebase can't store empty objects
    return (
      <Fragment>
        <div className="playlistContainer">
          <div className="playlistContainer__playlist">
            <PlaylistComponent
              playlist={playlist}
              itemOpen={(e)=>{console.log(e)}}
              itemDelete={this.handleDelete}
              changeOrder={this.changeOrder}
              totalTime={{ hours: 3, minutes: 45}}/>
          </div>
          <div className="playlistContainer__search">
            <Search
              itemClick={(id)=> this.handleAdd(id)}
              searchHandle={this.handleSearch}
              result={this.state.results}
              hasMore={typeof this.state.nextPage === typeof ''}
            />
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
