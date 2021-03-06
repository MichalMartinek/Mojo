import React from 'react';
import { mount } from 'enzyme';
import SideBarHeader from './SideBarHeader';

describe('SideBarHeader', () => {
  let props;

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
      handleTitleChange: jest.fn(),
      title: 'Playlist title'
    };
  });
  it('always renders title', () => {
    const sidebar = mount(<SideBarHeader {...props} />);
    const title = sidebar.find('.sidebar__title').props().value;
    expect(title).toBe(props.playlist.title);
  });
});
