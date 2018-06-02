// @flow

export type Player = {
  pauseVideo: () => void,
  playVideo: () => void,
};

export type Playlist = {
  position: PlaylistPosition,
  videos: { [string]: Video },
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
