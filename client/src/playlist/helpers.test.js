import { nextVideo, previousVideo } from './helpers';

describe('helpers', () => {
  let playlist;

  beforeEach(() => {
    playlist = {
      order: ['someKey', 'someKey2', 'someKey3'],
      position: {
        video: 'someKey2'
      },
    };
  });
  it('nextVideo works in normal order', () => {
    expect(nextVideo(playlist)).toBe('someKey3');
  });
  it('nextVideo returns first song on the end of the playlist', () => {
    playlist.position.video = 'someKey3'
    expect(nextVideo(playlist)).toBe('someKey');
  });
  it('previousVideo works in normal order', () => {
    expect(previousVideo(playlist)).toBe('someKey');
  });
  it('previousVideo returns last song on the beginning of the playlist', () => {
    playlist.position.video = 'someKey'
    expect(previousVideo(playlist)).toBe('someKey3');
  });
});
