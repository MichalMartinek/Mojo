import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import { routerReducer } from 'react-router-redux';
import app from './app/reducer';

export default combineReducers({
  app,
  intl: intlReducer,
  router: routerReducer,
});
