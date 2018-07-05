/* @flow */
import React from 'react'
import {compose} from 'redux'
import {connect }from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { bindActionCreators } from 'redux';
import * as actions from "../app/actions";
import {push} from 'react-router-redux'
import routes from '../app/routes'

type Props = {
  push: (path: string) => void,
  firebase: {
    login: ({provider: string, type: string}) => void,
  }
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
              }}>Login</button>
        </p>
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
