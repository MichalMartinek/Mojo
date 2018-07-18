// @flow
import * as constants from './constants'

export type Player = {
  pauseVideo: () => void,
  playVideo: () => void,
  setVolume: (volume: number) => void,
  getVolume: () => number,
};

export type Playlist = {
  position: PlaylistPosition,
  videos: { [string]: Video },
  order: Array<string>,
  title: string,
};

export type PlaylistPosition = {
  state: string,
  time: number,
  video: string,
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
    medium: Thumbnail,
  }
};

export type Thumbnail = {
  url: string,
  height: number,
  width: number,
};

export type Duration = {
  hours: number,
  minutes: number,
  seconds: number,
}
export type State = {
  +volume: number,
  +name: string,
};
export type SetVolumeAction = { type: constants.SET_VOLUME, value: number };
export type SetNameFieldAction = { type: constants.SET_NAME_FIELD, value: string };

export type Action =
  | SetVolumeAction
  | SetNameFieldAction;