/* @flow */

import React from 'react';
import Button from './Button';
import './App.css';

class Home extends React.Component<{}> {
  render() {
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

export default Home;
