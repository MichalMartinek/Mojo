/* @flow */

import React, { Fragment } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PlayBarContainer from './PlayBar/PlayBarContainer';
import SideBarContainer from './SideBar/SideBarContainer';
import type { Playlist } from './types';
import SearchContainer from './Search/SearchContainer';
import CustomMenu from './CustomMenu';
import { isEmpty, isLoaded } from 'react-redux-firebase';
import type { Profile } from '../profile/types';
import withLayout from '../common/withLayout';
import NotFoundView from '../common/NotFoundView';
import PlaylistLoading from './PlaylistLoading';
import { bindActionCreators } from 'redux';
import * as actions from './actions';

type Props = {
  match: {
    params: {
      id: string
    }
  },
  playlistId: string,
  profile: Profile,
  playlists: { [string]: Playlist },
  actions: {
    clearSearch: () => void
  }
};

class PlaylistView extends React.Component<Props> {
  componentDidMount() {
    this.props.actions.clearSearch();
  }
  render() {
    const { profile } = this.props;
    const playlistId = this.props.match.params.id;
    let content;

    if (
      this.props.playlists &&
      isLoaded(this.props.playlists[playlistId]) &&
      isEmpty(this.props.playlists[playlistId])
    ) {
      const NotFound = withLayout(NotFoundView, profile);
      return <NotFound />;
    }
    if (!this.props.playlists || !isLoaded(this.props.playlists[playlistId])) {
      content = <PlaylistLoading />;
    } else {
      const playlist = this.props.playlists[playlistId];
      if (!playlist.videos) playlist.videos = {}; // Because Firebase can't store empty objects
      if (!playlist.order) playlist.order = []; // Because Firebase can't store empty arrays
      content = (
        <div className="playlistContainer">
          <SideBarContainer
            id={playlistId}
            className="playlistContainer__sidebar"
          />
          <SearchContainer
            id={playlistId}
            className="playlistContainer__search"
          />
          <PlayBarContainer id={playlistId} />
        </div>
      );
    }
    return (
      <Fragment>
        <CustomMenu
          loading={!isLoaded(profile)}
          isAuthenticated={!isEmpty(profile)}
        />
        {content}
      </Fragment>
    );
  }
}
export default compose(
  firebaseConnect(props => [{ path: `playlists/${props.match.params.id}` }]),
  connect(
    state => ({
      playlists: state.firebase.data.playlists,
      profile: state.firebase.profile
    }),
    dispatch => ({
      actions: bindActionCreators(actions, dispatch)
    })
  )
)(PlaylistView);
