import * as types from './constants';

const initialState = {
  volume: 50,
};

export default (state = initialState, payload) => {
  switch (payload.type) {
    case types.SET_VOLUME:
      return {...state, volume: payload.volume};
    default:
      return state;
  }
};
