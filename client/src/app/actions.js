import * as types from './actionTypes';

export const addTransition = item => ({
  type: types.TRANSITION,
  item,
});

export const loading = () => ({
  type: types.LOADING,
});
export const autoload = () => ({
  type: types.AUTOLOAD,
});

export function login(id) {
  return {
    type: types.LOGGED_IN,
    loggedIn: true,
    id
  };
}
export function logout() {
  return {
    type: types.LOGGED_IN,
    loggedIn: false,
    id: ''
  };
}

export function loaded() {
  return {
    type: types.LOADED,
  };
}
export function setNotificationsDropDown(value) {
  return {
    type: types.NOTIFICATIONS_DROPDOWN,
    value
  };
}