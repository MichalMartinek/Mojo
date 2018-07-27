import type { Playlist } from './types';

export const nextVideo = (playlist: Playlist): string => {
  const position = playlist.order.indexOf(playlist.position.video);
  const newPosition = position + 1 === playlist.order.length ? 0 : position + 1;
  return playlist.order[newPosition];
};
export const previousVideo = (playlist: Playlist): string => {
  const position = playlist.order.indexOf(playlist.position.video);
  const newPosition = position === 0 ? playlist.order.length - 1 : position - 1;
  return playlist.order[newPosition];
};
