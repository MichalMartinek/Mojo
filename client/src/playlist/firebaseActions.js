// @flow
import type { Firebase } from '../common/types';
import type {
  PlayPauseAction,
  NextPreviousAction,
  SwitchSongAction,
  AddVideoAction,
  DeleteVideoAction,
  UpdatePlaylistAction
} from './types';
import * as constants from './constants';
import { nextVideo, previousVideo } from './helpers';
import { get } from 'lodash-es';
import { videoInfo } from '../utils/youtube';

const playlistPath = (id: string) => `/playlists/${id}`;
const positionPath = (id: string) => `${playlistPath(id)}/position`;
const videosPath = (id: string) => `${playlistPath(id)}/videos`;

export const play = (firebase: Firebase): PlayPauseAction => {
  return id =>
    firebase.update(positionPath(id), {
      state: constants.PLAYING,
      switchingSongs: false
    });
};

export const pause = (firebase: Firebase): PlayPauseAction => {
  return id => firebase.update(positionPath(id), { state: constants.PAUSED });
};

export const next = (firebase: Firebase): NextPreviousAction => {
  return (id, playlist, isPlaying) => {
    const next = nextVideo(playlist);
    return switchSong(firebase)(id, playlist, next, isPlaying);
  };
};
export const previous = (firebase: Firebase): NextPreviousAction => {
  return (id, playlist, isPlaying) => {
    const prev = previousVideo(playlist);
    return switchSong(firebase)(id, playlist, prev, isPlaying);
  };
};
export const switchSong = (firebase: Firebase): SwitchSongAction => {
  return (id, playlist, videoId, isPlaying) => {
    const changes: { switchingSongs?: boolean } = {
      video: videoId
    };
    if (isPlaying) {
      changes.switchingSongs = true;
    }
    return firebase.update(positionPath(id), changes);
  };
};

export const updatePlaylist = (firebase: Firebase): UpdatePlaylistAction => {
  return (id, obj) => firebase.update(playlistPath(id), obj);
};
export const updatePosition = (firebase: Firebase): UpdatePlaylistAction => {
  return (id, obj) => firebase.update(positionPath(id), obj);
};
export const addVideo = (firebase: Firebase): AddVideoAction => {
  return async (id, playlist, item) => {
    const res = await videoInfo(item.id);
    const duration = get(res, 'items[0].contentDetails.duration');
    if (duration) {
      item.duration = duration;
    }
    const addedVideo = await firebase.push(videosPath(id), item);
    let updateObject = {};
    if (playlist.order.length !== 0) {
      updateObject.order = [...playlist.order, addedVideo.key];
    } else {
      updateObject.order = [addedVideo.key];
      updateObject['position/video'] = addedVideo.key;
    }
    return firebase.update(playlistPath(id), updateObject);
  };
};

export const deleteVideo = (firebase: Firebase): DeleteVideoAction => {
  return async (playlistId, playlist, id) => {
    const newOrder = playlist.order.filter(item => item !== id);
    await firebase.update(playlistPath(playlistId), { order: newOrder });
    return firebase
      .ref()
      .child(`${videosPath(playlistId)}/${id}`)
      .remove();
  };
};
