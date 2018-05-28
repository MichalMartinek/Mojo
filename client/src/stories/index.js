import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {  Welcome } from '@storybook/react/demo';
import PlayBar from '../playlist/PlayBar'
import '../App.css';
import '../iconLibrary'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('PlayBar')} />);

storiesOf('PlayBar', module)
  .add('paused', () => <PlayBar paused/>)
  .add('playing', () => <PlayBar />)
;
