/* @flow */

import React from 'react';
import Spinner from '../common/Spinner';
import { withFirebase, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import withLayout from '../common/withLayout';
import * as actions from '../common/firebaseActions';
import type { Firebase } from '../common/types';
import type { Profile } from '../profile/types';
import { push } from 'react-router-redux';
import routes from '../app/routes';

type Props = {
  push: (path: string) => void,
  profile: Profile,
  firebase: Firebase
};
type State = {
  loaded: boolean,
  creating: boolean,
  error: boolean
};
class NewPlaylistView extends React.Component<Props, State> {
  state = {
    loaded: false,
    creating: false,
    error: false
  };
  handleUpdate = () => {
    const { profile } = this.props;
    const { loaded, creating } = this.state;

    if (isLoaded(profile) && !loaded && !creating) {
      this.setState({ loaded: true });
      this.createPlaylist();
    }
  };
  createPlaylist = () => {
    this.setState({ creating: true });
    const { profile, firebase, push } = this.props;
    return actions
      .addPlaylist(firebase, 'New playlist', profile)
      .then(data => {
        this.setState({ creating: false });
        push(routes.playlist.replace(':id', data.key));
      })
      .catch(e => {
        this.setState({ error: true });
      });
  };
  componentDidMount() {
    this.handleUpdate();
  }
  componentDidUpdate() {
    this.handleUpdate();
  }
  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div className="newPlaylist">
          <div className="newPlaylist__content">
            <h3 className="newPlaylist__title">Error</h3>
          </div>
        </div>
      );
    }
    return (
      <div className="newPlaylist">
        <div className="newPlaylist__content">
          <h3 className="newPlaylist__title">Creating new playlist</h3>
          <Spinner />
        </div>
      </div>
    );
  }
}

export default withLayout(
  compose(
    withFirebase,
    connect(
      state => ({
        profile: state.firebase.profile
      }),
      dispatch => ({
        actions: bindActionCreators(actions, dispatch),
        push: bindActionCreators(push, dispatch)
      })
    )
  )(NewPlaylistView)
);
