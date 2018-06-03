import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Playlist from '../playlist/Playlist'

const PlayBarDoc = `
      is bar containing player controls, preview and settings    `

const commonProps = {
  playlist: {
    videos: {
      'someKey': {
        description: "Description",
        channelTitle: "Author/Channel",
        title: "Title",
        thumbnails: {
          medium: {
            url: 'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
            height: 460,
            width: 380,
          },
        }
      },
      'someKey2': {
        description: "Description",
        channelTitle: "Author/Channel",
        title: "Title",
        thumbnails: {
          medium: {
            url: 'https://images.unsplash.com/photo-1495183100528-6acc1f0d9146?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f3558575c3dfe47c782ec070964bf91c&auto=format&fit=crop&w=500&q=60',
            height: 460,
            width: 380,
          },
        }
      }
    },
    title: "Playlist title",
    author: "Author/Channel",
  },
  itemClick: (e)=>{console.log(e)},
  totalTime: {
    hours: 3,
    minutes: 45,
  }
}

storiesOf('Playlist', module)
  .add('basic',
    withInfo(PlayBarDoc)(() =>
      <div style={{width: 1000, height: 300}}>
        <Playlist {...commonProps}/>
      </div>
    )
  )