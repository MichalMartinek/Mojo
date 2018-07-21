import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import Spinner from '../common/Spinner';

const SpinnerDoc = `
      is simple spinner component`;

storiesOf('Spinner', module).add(
  'spinning',
  withInfo(SpinnerDoc)(() => <Spinner />)
);
