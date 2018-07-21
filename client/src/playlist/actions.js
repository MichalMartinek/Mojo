// @flow
import * as types from './constants';
import type {SetNameFieldAction, SetVolumeAction} from './types';

export const setVolume = (value: number): SetVolumeAction => ({
  type: types.SET_VOLUME,
  value
});
export const setNameField = (value: string): SetNameFieldAction => ({
  type: types.SET_NAME_FIELD,
  value
});
