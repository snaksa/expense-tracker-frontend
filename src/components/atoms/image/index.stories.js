import React from 'react';
import { storiesOf } from '@storybook/react'
import Image from '.';

export default { title: 'Image' };

storiesOf('Image', module)
  .add('default', () => <Image src={'https://i.picsum.photos/id/507/300/300.jpg'} />)