import React from 'react';

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import {  Welcome } from '@storybook/react/demo';
import PlayBar from '../playlist/PlayBar'
import '../App.css';
import '../iconLibrary'
import './playBar'
import './playlist'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('PlayBar')} />);
