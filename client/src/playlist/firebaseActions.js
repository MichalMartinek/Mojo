// @flow
import type { Firebase } from '../common/types';
import type {
  Playlist,
  Video,
  PlayPauseAction,
  NextPreviousAction,
  AddVideoAction,
  DeleteVideoAction,
  UpdatePlaylistAction
} from './types';
import * as constants from './constants';
import { get } from 'lodash-es';
import { videoInfo } from '../utils/youtube';

const playlistPath = (id: string) => `/playlists/${id}`;
const positionPath = (id: string) => `${playlistPath(id)}/position`;
const videosPath = (id: string) => `${playlistPath(id)}/videos`;

export const play = (firebase: Firebase): PlayPauseAction => {
  return (id: string) =>
    firebase.update(positionPath(id), {
      state: constants.PLAYING,
      switchingSongs: false
    });
};

export const pause = (firebase: Firebase): PlayPauseAction => {
  return (id: string) =>
    firebase.update(positionPath(id), { state: constants.PAUSED });
};

export const next = (firebase: Firebase): NextPreviousAction => {
  return (id: string, playlist: Playlist, isPlaying?: boolean) => {
    const position = playlist.order.indexOf(playlist.position.video);
    const newPosition =
      position + 1 === playlist.order.length ? 0 : position + 1;
    const changes: { switchingSongs?: boolean } = {
      video: playlist.order[newPosition]
    };
    if (isPlaying) {
      changes.switchingSongs = true;
    }
    return firebase.update(positionPath(id), changes);
  };
};
export const previous = (firebase: Firebase): NextPreviousAction => {
  return (id: string, playlist: Playlist, isPlaying?: boolean) => {
    const position = playlist.order.indexOf(playlist.position.video);
    const newPosition =
      position === 0 ? playlist.order.length - 1 : position - 1;
    const changes: { switchingSongs?: boolean } = {
      video: playlist.order[newPosition]
    };
    if (isPlaying) {
      changes.switchingSongs = true;
    }
    return firebase.update(positionPath(id), changes);
  };
};

export const updatePlaylist = (firebase: Firebase): UpdatePlaylistAction => {
  return (id: string, obj: $Shape<Playlist>) =>
    firebase.update(playlistPath(id), obj);
};
export const updatePosition = (firebase: Firebase): UpdatePlaylistAction => {
  return (id: string, obj: $Shape<Playlist>) =>
    firebase.update(positionPath(id), obj);
};
export const addVideo = (firebase: Firebase): AddVideoAction => {
  return async (id: string, playlist: Playlist, item: $Shape<Video>) => {
    const res = await videoInfo(item.id);
    const duration = get(res, 'items[0].contentDetails.duration');
    if (duration) {
      item.duration = duration;
    }
    const addedVideo = await firebase.push(videosPath(id), item);
    const newOrder = playlist.order
      ? [...playlist.order, addedVideo.key]
      : [addedVideo.key];
    return firebase.update(playlistPath(id), { order: newOrder });
  };
};

export const deleteVideo = (firebase: Firebase): DeleteVideoAction => {
  return async (playlistId: string, playlist: Playlist, id: string) => {
    const newOrder = playlist.order.filter(item => item !== id);
    await firebase.update(playlistPath(playlistId), { order: newOrder });
    return firebase
      .ref()
      .child(`${videosPath(playlistId)}/${id}`)
      .remove();
  };
};
