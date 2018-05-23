/* @flow */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import { withFirebase } from 'react-redux-firebase'

class Login extends React.Component<{}> {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome</h1>
        </header>
        <p className="App-intro">
              <button onClick={() => {
                this.props.firebase.login({
                  provider: 'facebook',
                  type: 'popup',
                  // scopes: ['email'] // not required
                })
              }}>Login</button>
        </p>
      </div>
    );
  }
}

export default withFirebase(Login)
