/* @flow */

import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router'
import Sidebar from './Sidebar';
import Menu from './Menu';
import Home from '../Home';
import Login from '../Login';
import history from '../history';

class App extends React.Component<{}> {
  render() {
    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <div>
            <Menu />
            <Sidebar />
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
          </div>
        </ConnectedRouter>
      </div>
    );
  }
}

export default App;
