/* @flow */

import React from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'

class Home extends React.Component<{}> {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Landing</h1>
        </header>
      </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => [
    { path: 'feed' } // string equivalent 'todos'
  ]),
  connect(
    (state) => ({
      feed: state.firebase.data.feed,
      profile: state.firebase.profile // load profile
    })
  )
)(Home)
