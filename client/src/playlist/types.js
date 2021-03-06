// @flow
import * as constants from './constants';

export type Player = {
  pauseVideo: () => void,
  playVideo: () => void,
  setVolume: (volume: number) => void,
  getVolume: () => number
};

export type Playlist = {
  position: PlaylistPosition,
  videos: { [string]: Video },
  order: Array<string>,
  title: string
};

export type PlaylistPosition = {
  state: string,
  switchingSongs: boolean,
  time: number,
  video: string
};
export type Video = {
  description: string,
  channelTitle: string,
  channelId: string,
  id: string,
  kind: string,
  link: string,
  title: string,
  duration: string,
  publishedAt: string,
  thumbnails: {
    default: Thumbnail,
    high: Thumbnail,
    medium: Thumbnail
  }
};

export type Thumbnail = {
  url: string,
  height: number,
  width: number
};

export type Duration = {
  hours: number,
  minutes: number,
  seconds: number
};

// Redux state
export type State = {
  +volume: number,
  +name: string,
  +results: Array<Video>,
  +nextPage: null | string,
  +searchField: string,
  +searchStatus: string,
  +searchFieldFocused: boolean
};

// Firebase actions
export type PlayPauseAction = (id: string) => Promise<Object>;
export type NextPreviousAction = (
  id: string,
  playlist: Playlist,
  isPlaying?: boolean
) => Promise<Object>;
export type SwitchSongAction = (
  id: string,
  videoId: string,
  isPlaying?: boolean
) => Promise<Object>;
export type UpdatePlaylistAction = (
  id: string,
  obj: $Shape<Playlist>
) => Promise<Object>;
export type UpdatePositionAction = (
  id: string,
  obj: $Shape<PlaylistPosition>
) => Promise<Object>;
export type AddVideoAction = (
  id: string,
  playlist: Playlist,
  item: $Shape<Video>
) => Promise<Object>;
export type DeleteVideoAction = (
  playlistId: string,
  playlist: Playlist,
  id: string
) => Promise<Object>;

// Redux actions
export type SetVolumeAction = { type: constants.SET_VOLUME, value: number };
export type ClearSearchAction = { type: constants.CLEAR_SEARCH };
export type SetSearchFieldAction = {
  type: constants.SET_SEARCH_FIELD,
  value: string
};
export type SetSearchStatusAction = {
  type: constants.SET_SEARCH_STATUS,
  value: string
};
export type SetSearchFieldFocusedAction = {
  type: constants.SET_SEARCH_FIELD_FOCUSED,
  value: boolean
};
export type SetSearchResultAction = {
  type: constants.SET_SEARCH_RESULT,
  results: Array<Video>,
  append: boolean,
  next: string
};
export type SetNameFieldAction = {
  type: constants.SET_NAME_FIELD,
  value: string
};

export type Action =
  | SetVolumeAction
  | SetNameFieldAction
  | ClearSearchAction
  | SetSearchFieldAction
  | SetSearchResultAction
  | SetSearchStatusAction
  | SetSearchFieldFocusedAction;
