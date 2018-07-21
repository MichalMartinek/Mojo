// @flow
import * as types from './constants';
import type { SetVolumeAction } from './types';

export const setVolume = (value: number): SetVolumeAction => ({
  type: types.SET_VOLUME,
  value
});
