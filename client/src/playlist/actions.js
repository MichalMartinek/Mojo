// @flow
import * as types from './constants';
import searchYT from 'youtube-search';
import * as globalConstants from '../constants';

import type {
  Action,
  ClearSearchAction,
  SetNameFieldAction,
  SetSearchFieldAction,
  SetSearchFieldFocusedAction,
  SetSearchStatusAction,
  SetVolumeAction
} from './types';

export const setVolume = (value: number): SetVolumeAction => ({
  type: types.SET_VOLUME,
  value
});
export const setNameField = (value: string): SetNameFieldAction => ({
  type: types.SET_NAME_FIELD,
  value
});
export const setSearchField = (value: string): SetSearchFieldAction => ({
  type: types.SET_SEARCH_FIELD,
  value
});
export const setSearchFieldFocused = (
  value: boolean
): SetSearchFieldFocusedAction => ({
  type: types.SET_SEARCH_FIELD_FOCUSED,
  value
});
export const setSearchStatus = (value: string): SetSearchStatusAction => ({
  type: types.SET_SEARCH_STATUS,
  value
});
export const clearSearch = (): ClearSearchAction => ({
  type: types.CLEAR_SEARCH
});

export const search = (text: string, nextPage: ?string) => (
  dispatch: Action => {}
) => {
  if (!nextPage) {
    dispatch(setSearchStatus(types.STATUS_LOADING));
  }
  const opts = {
    maxResults: 10,
    key: globalConstants.GOOGLE_API,
    type: 'video',
    pageToken: nextPage
  };

  searchYT(text, opts, (err, results, pageInfo) => {
    if (err) {
      dispatch(setSearchStatus(types.STATUS_ERROR));
      return;
    }
    if (nextPage) {
      dispatch({
        type: types.SET_SEARCH_RESULT,
        results,
        append: true,
        next: pageInfo.nextPageToken
      });
    } else {
      dispatch({
        type: types.SET_SEARCH_RESULT,
        results,
        append: false,
        next: pageInfo.nextPageToken
      });
    }
  });
};
