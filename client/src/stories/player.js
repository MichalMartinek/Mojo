import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import PlayBar from '../playlist/PlayBar'

const PlayBarDoc = `
      description or documentation about my component, supports markdown
    
    `
storiesOf('PlayBar', module)
  .add('paused',
    withInfo(PlayBarDoc)(() =>
      <PlayBar paused/>
    )
  )
  .add('playing',
    withInfo(PlayBarDoc)(() =>
      <PlayBar />
    )
  )