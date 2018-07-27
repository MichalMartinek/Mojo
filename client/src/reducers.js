import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';
import { routerReducer } from 'react-router-redux';
import { firebaseReducer } from 'react-redux-firebase';
import playlist from './playlist/reducer';

export default combineReducers({
  playlist,
  intl: intlReducer, // TODO: implement internationalisation
  router: routerReducer,
  firebase: firebaseReducer
});
