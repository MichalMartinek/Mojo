import * as constants from './constants';
import type { Action, State } from './types';

const searchPart = {
  results: [],
  nextPage: null,
  searchStatus: constants.STATUS_INIT,
  searchField: '',
  searchFieldFocused: false
};
export const initialState: State = {
  volume: 50,
  name: '',
  ...searchPart
};

export default (state: State = initialState, payload: Action) => {
  switch (payload.type) {
    case constants.SET_VOLUME:
      return { ...state, volume: payload.value };
    case constants.SET_NAME_FIELD:
      return { ...state, name: payload.value };
    case constants.SET_SEARCH_FIELD:
      return { ...state, searchField: payload.value };
    case constants.SET_SEARCH_FIELD_FOCUSED:
      return { ...state, searchFieldFocused: payload.value };
    case constants.SET_SEARCH_STATUS:
      return { ...state, searchStatus: payload.value };
    case constants.CLEAR_SEARCH:
      return { ...state, ...searchPart };
    case constants.SET_SEARCH_RESULT:
      let results = [];
      if (payload.append) {
        results = [...state.results];
      }
      results = [...results, ...payload.results];
      return {
        ...state,
        results,
        nextPage: payload.next,
        searchStatus: constants.STATUS_SEARCHED
      };
    default:
      return state;
  }
};
