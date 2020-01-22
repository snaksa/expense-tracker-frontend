import React from 'react';
import { storiesOf } from '@storybook/react'
import HeroMenu from '.';

export default { title: 'HeroMenu' };

storiesOf('HeroMenu', module)
  .add('default', () => <HeroMenu />)