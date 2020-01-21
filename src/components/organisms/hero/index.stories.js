import React from 'react';
import { storiesOf } from '@storybook/react'
import Hero from '.';

export default { title: 'Hero' };

storiesOf('Hero', module)
  .add('default', () => <Hero />)