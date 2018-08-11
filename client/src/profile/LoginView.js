/* @flow */
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { bindActionCreators } from 'redux';
import withLayout from '../common/withLayout';
import * as firebaseActions from '../common/firebaseActions';
import { push } from 'react-router-redux';
import routes from '../app/routes';
import type { LoginLogoutAction } from '../common/types';
import Login from './Login';
import { bindFirebaseActions } from '../utils/bindFirebaseActions';

type Props = {
  push: (path: string) => void,
  firebaseActions: {
    loginWithGoogle: LoginLogoutAction,
    loginWithFacebook: LoginLogoutAction,
    loginWithGithub: LoginLogoutAction
  }
};

class LoginView extends React.Component<Props> {
  loginWithGoogle = async (): Promise<any> => {
    await this.props.firebaseActions.loginWithGoogle();
    this.props.push(routes.profile);
  };
  loginWithFacebook = async (): Promise<any> => {
    await this.props.firebaseActions.loginWithFacebook();
    this.props.push(routes.profile);
  };
  loginWithGithub = async (): Promise<any> => {
    await this.props.firebaseActions.loginWithGithub();
    this.props.push(routes.profile);
  };
  render() {
    return (
      <Login
        loginWithFacebook={this.loginWithFacebook}
        loginWithGithub={this.loginWithGithub}
        loginWithGoogle={this.loginWithGoogle}
      />
    );
  }
}

export default withLayout(
  compose(
    withFirebase,
    connect(
      null,
      dispatch => ({
        push: bindActionCreators(push, dispatch)
      }),
      (stateProps, dispatchProps, ownProps) => {
        const boundFirebaseActions = bindFirebaseActions(
          ownProps.firebase,
          firebaseActions
        );
        return Object.assign({}, ownProps, stateProps, dispatchProps, {
          firebaseActions: boundFirebaseActions
        });
      }
    )
  )(LoginView)
);
