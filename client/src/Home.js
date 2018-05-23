/* @flow */

import React from 'react';
import Button from './Button';
import { firebaseConnect } from 'react-redux-firebase'
import {compose} from 'redux';
import {connect }from 'react-redux'
import './App.css';

class Home extends React.Component<{}> {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React with CIRCLECI</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.

    <Button />
        </p>
      </div>
    );
  }
}

export default compose(
  firebaseConnect((props) => {
    return [
      'feed'
    ]
  }),
  connect(
    (state) => ({
      feed: state.firebase.data.feed,
      profile: state.firebase.profile // load profile
    })
  )
)(Home)
