import React from 'react';
import { storiesOf } from '@storybook/react'
import RoundImage from '.';

export default { title: 'RoundImage' };

storiesOf('RoundImage', module)
  .add('default', () => <RoundImage src={'https://i.picsum.photos/id/507/300/300.jpg'} />)