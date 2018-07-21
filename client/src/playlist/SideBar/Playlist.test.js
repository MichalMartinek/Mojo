import React from 'react';
import { mount } from 'enzyme';
import Playlist from './Playlist';

describe('Playlist', () => {
  let props;
  let mountedLockScreen;

  const playlist = () => {
    if (!mountedLockScreen) {
      mountedLockScreen = mount(<Playlist {...props} />);
    }
    return mountedLockScreen;
  };

  beforeEach(() => {
    props = {
      playlist: {
        videos: {
          someKey: {
            description: 'Description',
            channelTitle: 'Author/Channel',
            duration: '1M30S',
            title: 'Title',
            thumbnails: {
              medium: {
                url:
                  'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
                height: 460,
                width: 380
              }
            }
          },
          someKey2: {
            description: 'Description',
            channelTitle: 'Author/Channel',
            duration: '1M30S',
            title: 'Title',
            thumbnails: {
              medium: {
                url:
                  'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
                height: 460,
                width: 380
              }
            }
          }
        },
        order: ['someKey', 'someKey2'],
        title: 'Playlist title',
        author: 'Author/Channel'
      },
      itemOpen: jest.fn(),
      itemDelete: jest.fn(),
      handleTitleChange: jest.fn(),
      title: 'Playlist title',
      changeOrder: jest.fn()
    };
    mountedLockScreen = undefined;
  });

  it('always renders a divs with videos in right order', () => {
    props.className = 'testingClass';
    const divs = playlist().find('.playlist__container');

    expect(divs.length).toBeGreaterThan(0);
    expect(divs.props().children[0].key).toBe(props.playlist.order[0]);
  });
  it('always renders title', () => {
    const title = playlist()
      .find('.playlist__title')
      .props().value;
    expect(title).toBe(props.playlist.title);
  });
});
