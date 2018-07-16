import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase'
import app from './app/reducer';
import playlist from './playlist/reducer';

export default combineReducers({
  app,
  playlist,
  intl: intlReducer,
  router: routerReducer,
  firebase: firebaseReducer
});
