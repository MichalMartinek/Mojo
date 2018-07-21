/* @flow */
import * as React from 'react';
import search from 'youtube-search';
import type { Playlist, Video } from '../types';
import Search from './Search';
import * as constants from '../../constants';
import { bindFirebaseActions } from '../../utils/bindFirebaseActions';
import type { AddVideoAction } from '../types';
import { addVideo } from '../firebaseActions';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';

type Props = {
  addVideo: AddVideoAction,
  playlist: Playlist,
  id: string
};

type State = {
  results: null | Array<Video>,
  nextPage: ?string
};
class SearchContainer extends React.Component<Props, State> {
  state = {
    results: null,
    nextPage: undefined
  };
  handleSearch: (text: string, nextPage: ?boolean) => void = (
    text,
    nextPage
  ) => {
    const opts = {
      maxResults: 10,
      key: constants.GOOGLE_API,
      type: 'video',
      pageToken: undefined
    };

    if (nextPage) opts.pageToken = this.state.nextPage;

    search(text, opts, (err, newPage, pageInfo) => {
      if (err) return console.log(err);
      const results =
        nextPage && this.state.results
          ? [...this.state.results, ...newPage]
          : newPage;
      this.setState({ results, nextPage: pageInfo.nextPageToken });
    });
  };

  render() {
    const { results, nextPage } = this.state;
    const { addVideo, id, playlist } = this.props;
    return (
      <Search
        handleSearch={this.handleSearch}
        hasMore={typeof nextPage === typeof ''}
        results={results}
        itemClick={item => {
          addVideo(id, playlist, item);
        }}
      />
    );
  }
}

export default withFirebase(
  connect(
    (state, props) => ({
      playlist: state.firebase.data.playlists[props.id]
    }),
    () => ({}),
    (stateProps, dispatchProps, ownProps) => {
      const boundFirebaseAction = bindFirebaseActions(
        ownProps.firebase,
        addVideo
      );
      return Object.assign({}, ownProps, stateProps, dispatchProps, {
        addVideo: boundFirebaseAction
      });
    }
  )(SearchContainer)
);
