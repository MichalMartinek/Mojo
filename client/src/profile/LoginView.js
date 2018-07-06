/* @flow */
import React from 'react'
import {compose} from 'redux'
import {connect }from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import * as actions from "../app/actions";
import * as firebaseActions from "../common/firebaseActions";
import {push} from 'react-router-redux'
import routes from '../app/routes'
import type {Firebase} from "../common/types";

type Props = {
  push: (path: string) => void,
  firebase: Firebase
};

class LoginView extends React.Component<Props> {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
              <button onClick={async () => {
                const res = await this.props.firebase.login({
                  provider: 'google',
                  type: 'popup',
                  // scopes: ['email'] // not required
                })
                console.log(res);
                this.props.push(routes.profile)
              }}>Login with Google</button>
          <button onClick={async () => {
            const res = await this.props.firebase.login({
              provider: 'facebook',
              type: 'popup',
              // scopes: ['email'] // not required
            })
            console.log(res);
            this.props.push(routes.profile)
          }}>Login with Facebook</button>
          <button onClick={async () => {
            const res: {additionalUserInfo: { username: string }} = await this.props.firebase.login({
              provider: 'github',
              type: 'popup',
              scope: 'user' // not required
            })
            await firebaseActions.updateProfile(this.props.firebase, {displayName: res.additionalUserInfo.username})
            this.props.push(routes.profile)
          }}>Login with Github</button>
        </p>
        <div>
          Or you can <Link to={routes.newPlaylist}>create new playlist</Link> without login in.
        </div>
      </div>
    );
  }
}

export default compose(
  withFirebase,
  connect(null, (dispatch) => ({
    actions: bindActionCreators(actions, dispatch),
    push: bindActionCreators(push, dispatch),
  }))
)(LoginView)
