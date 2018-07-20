/* @flow */

import React, {Fragment} from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import PlayBarContainer from './PlayBar/PlayBarContainer'
import SideBarContainer from './SideBar/SideBarContainer'
import type {Playlist} from "./types";
import SearchContainer from "./Search/SearchContainer";
import VideoPlayer from "./SideBar/VideoPlayer";

type Props = {
  match: {
    params: {
      id: string
    }
  },
  playlistId: string,
  playlists: { [string]: Playlist },
}

class PlaylistView extends React.Component<Props> {
  render() {
    const playlistId = this.props.match.params.id
    if (!this.props.playlists || !this.props.playlists[playlistId]) {
      return <div>
        Loading or not found
      </div>
    }
    const playlist = this.props.playlists[playlistId]
    if (!playlist.videos) playlist.videos = {} // Because Firebase can't store empty objects
    if (!playlist.order) playlist.order = [] // Because Firebase can't store empty arrays

    return (
      <Fragment>
        <div className="playlistContainer">
          <SideBarContainer
            id={playlistId}
          />
          <div className="playlistContainer__search">
            <SearchContainer
              id={playlistId}
            />
          </div>
        </div>
        <VideoPlayer
          id={playlistId}
        />
        <PlayBarContainer
          id={playlistId}
        />
      </Fragment>
    );
  }
}
export default compose(
    firebaseConnect((props) => [
      { path: `playlists/${props.match.params.id}` }
    ]),
  connect(
    (state) => ({
      playlists: state.firebase.data.playlists,
    })
  )
)(PlaylistView)
