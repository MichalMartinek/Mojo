import * as types from './actionTypes';

const initialState = {
  transitionTo: '/',
  loading: false,
  addedTransition: false,
  autoload: false,
  loggedIn: false,
  userId: '',
  notificationsDropDown: types.DROPDOWN_CLOSE,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case types.TRANSITION:
      return Object.assign({}, state, { transitionTo: payload.item, addedTransition: true });
    case types.LOADING:
      return Object.assign({}, state, { loading: true });
    case types.AUTOLOAD:
      return Object.assign({}, state, { autoload: true });
    case types.LOADED:
      return Object.assign({}, state, { loading: false });
    case types.NOTIFICATIONS_DROPDOWN:
      return Object.assign({}, state, { notificationsDropDown: payload.value });
    case types.LOGGED_IN:
      return Object.assign({}, state, { loggedIn: payload.loggedIn, userId: payload.id });
    default:
      return state;
  }
};
