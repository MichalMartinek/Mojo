/* @flow */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import * as firebaseActions from '../common/firebaseActions';
import { push } from 'react-router-redux';
import routes from '../app/routes';
import type { Firebase } from '../common/types';
import Login from './Login';

type Props = {
  push: (path: string) => void,
  firebase: Firebase
};

class LoginView extends React.Component<Props> {
  loginWithGoogle = async (): Promise<any> => {
    await this.props.firebase.login({
      provider: 'google',
      type: 'popup'
      // scopes: ['email'] // not required
    });
    this.props.push(routes.profile);
  };
  loginWithFacebook = async (): Promise<any> => {
    await this.props.firebase.login({
      provider: 'facebook',
      type: 'popup'
      // scopes: ['email'] // not required
    });
    this.props.push(routes.profile);
  };
  loginWithGithub = async (): Promise<any> => {
    const res: {
      additionalUserInfo: { username: string }
    } = await this.props.firebase.login({
      provider: 'github',
      type: 'popup',
      scope: ['user:email'] // not required
    });
    console.log(res);
    await firebaseActions.updateProfile(this.props.firebase, {
      displayName: res.additionalUserInfo.username
    });
    this.props.push(routes.profile);
  };
  handleNewPlaylist = () => {
    this.props.push(routes.profile);
  };
  render() {
    console.log(this.props);
    return (
      <Login
        newPlaylist={this.handleNewPlaylist}
        loginWithFacebook={this.loginWithFacebook}
        loginWithGithub={this.loginWithGithub}
        loginWithGoogle={this.loginWithGoogle}
      />
    );
  }
}

export default compose(
  withFirebase,
  connect(
    null,
    dispatch => ({
      push: bindActionCreators(push, dispatch)
    })
  )
)(LoginView);
