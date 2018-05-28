import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import {  Welcome } from '@storybook/react/demo';
import PlayBar from '../playlist/Playbar'
import '../App.css';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('PlayBar', module)
  .add('basic', () => <PlayBar />)
;
