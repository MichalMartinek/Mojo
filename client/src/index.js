import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import history from './history';
import { routerMiddleware } from 'react-router-redux'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

import App from './app/App';

import './iconLibrary'
import reducers from './reducers' // Or wherever you keep your reducers
import registerServiceWorker from './registerServiceWorker';
import locateMessages from './localization/cs';
import './App.css';

// Create a history of your choosing (we're using a browser history in this case)

const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];

/* eslint-disable no-underscore-dangle */
if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
/* eslint-enable */

const initialState = {
  intl: {
    defaultLocale: 'cs',
    locale: 'cs',
    messages: locateMessages,
  },
  // ...other initialState
};
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAd3aCWmRNkPDY3_hwaLwG7UIPvg7fI3xs",
    authDomain: "geom-280cd.firebaseapp.com",
    databaseURL: "https://geom-280cd.firebaseio.com",
    projectId: "geom-280cd",
    storageBucket: "geom-280cd.appspot.com",
    messagingSenderId: "851478162916"
  };

firebase.initializeApp(firebaseConfig) // <- new to v2.*.*
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}
// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStoreWithFirebase(
  reducers,
  initialState,
  composedEnhancers
)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
