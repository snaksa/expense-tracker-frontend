import React from 'react';
import { storiesOf } from '@storybook/react'
import Heading from '.';

export default { title: 'Heading' };

storiesOf('Heading', module)
  .add('default', () => <Heading title="My title" subtitle="My subtitle" />)