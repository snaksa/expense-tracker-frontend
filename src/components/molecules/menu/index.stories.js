import React from 'react';
import { storiesOf } from '@storybook/react'
import Menu from '.';

export default { title: 'Menu' };

storiesOf('HeroMenu', module)
  .add('default', () => <Menu />)