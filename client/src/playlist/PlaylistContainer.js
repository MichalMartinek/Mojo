/* @flow */

import React, {Fragment} from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import PlayBarContainer from './PlayBarContainer'
import PlaylistComponent from './Playlist'
import {videoInfo} from "../utils/youtube";
import type {Playlist} from "./types";
import { get } from 'lodash-es';
import Search from "../search/SearchContainer";

type Props = {
  playlistId: string,
  playlists: { [string]: Playlist },
  firebase: any,
}

//TODO: refactor handle methods and handle errors
class PlaylistContainer extends React.Component<Props> {

  handleAdd = async (item) => {
    if (item) {
      const res = await videoInfo(item.id)
      const duration = get(res, 'items[0].contentDetails.duration')
      if (duration) {
        item.duration = duration
      }
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
  handleTitleChange = (title) => (
    this.props.firebase.update(`/playlists/${this.props.playlistId}`, {title})
  )
  handlePlayItem = (key) => {
    this.props.firebase.update(`/playlists/${this.props.playlistId}`, {position: {video:key}})
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
              itemOpen={this.handlePlayItem}
              itemDelete={this.handleDelete}
              changeOrder={this.changeOrder}
              handleTitleChange={this.handleTitleChange}
              totalTime={{ hours: 3, minutes: 45}}/>
          </div>
          <div className="playlistContainer__search">
            <Search
              itemClick={(id)=> this.handleAdd(id)}
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
