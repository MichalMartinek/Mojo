import * as types from './constants';

export const setVolume = volume => ({
  type: types.SET_VOLUME,
  volume,
});
