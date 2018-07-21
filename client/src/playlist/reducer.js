// @flow
import * as constants from './constants';
import type { Action, State } from './types';

const initialState: State = {
  volume: 50,
  name: ''
};

export default (state: State = initialState, payload: Action) => {
  switch (payload.type) {
    case constants.SET_VOLUME:
      return { ...state, volume: payload.value };
    case constants.SET_NAME_FIELD:
      return { ...state, name: payload.value };
    default:
      return state;
  }
};
