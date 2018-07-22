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
import { bindActionCreators } from 'redux';

type Props = {
  addVideo: AddVideoAction,
  playlist: Playlist,
  id: string,
  className: string,
  results: null | Array<Video>,
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
      actions
    } = this.props;
    return (
      <div className={className}>
        <div className="search">
          <div className="search__resultContainer">
            {results ? (
              <SearchResult
                itemClick={item => {
                  addVideo(id, playlist, item);
                }}
                videos={results}
                hasMore={typeof nextPage === typeof ''}
                loadMore={() => {
                  actions.search('', nextPage);
                }}
              />
            ) : (
              <div>Use search to get videos</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(
  connect(
    (state, props) => ({
      playlist: state.firebase.data.playlists[props.id],
      nextPage: state.playlist.nextPage,
      results: state.playlist.results
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
