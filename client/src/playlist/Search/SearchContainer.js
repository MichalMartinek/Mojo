/* @flow */
import * as React from 'react';
import type { Playlist, Video } from '../types';
import SearchResult from './SearchResult';
import { bindFirebaseActions } from '../../utils/bindFirebaseActions';
import type { AddVideoAction } from '../types';
import { addVideo } from '../firebaseActions';
import { withFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as constants from '../constants';
import { bindActionCreators } from 'redux';
import Spinner from '../../common/Spinner';

type Props = {
  addVideo: AddVideoAction,
  playlist: Playlist,
  id: string,
  status: string,
  className: string,
  results: Array<Video>,
  nextPage: ?string,
  actions: {
    search: (inputText: string, nextPage: ?string) => void
  }
};

class SearchContainer extends React.Component<Props> {
  static defaultProps = {
    className: ''
  };

  render() {
    const {
      addVideo,
      className,
      id,
      playlist,
      results,
      nextPage,
      actions,
      status
    } = this.props;
    let content;
    switch (status) {
      case constants.STATUS_INIT:
        content = (
          <div className="search__init">
            <h1 className="search__heading search__heading--init">
              Search video on Youtube
            </h1>
          </div>
        );
        break;
      case constants.STATUS_LOADING:
        content = (
          <div className="search__center">
            <Spinner />
            <h1 className="search__heading">Loading</h1>
          </div>
        );
        break;
      case constants.STATUS_ERROR:
        content = (
          <div className="search__center">
            <h1 className="search__heading">Sorry, error occurred</h1>
          </div>
        );
        break;
      case constants.STATUS_SEARCHED:
      default:
        content = (
          <div className="search__resultContainer">
            <SearchResult
              itemClick={item => {
                addVideo(id, playlist, item);
              }}
              videos={results}
              hasMore={typeof nextPage === 'string'}
              loadMore={() => {
                actions.search('', nextPage);
              }}
            />
          </div>
        );
        break;
    }
    return (
      <div className={className}>
        <div className="search">{content}</div>
      </div>
    );
  }
}

export default withFirebase(
  connect(
    (state, props) => ({
      playlist: state.firebase.data.playlists[props.id],
      nextPage: state.playlist.nextPage,
      results: state.playlist.results,
      status: state.playlist.searchStatus
    }),
    dispatch => ({
      actions: bindActionCreators(actions, dispatch)
    }),
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
