import React from 'react';
import { storiesOf } from '@storybook/react'
import Button from '.';

export default { title: 'Button' };

storiesOf('Button', module)
  .add('default', () => <Button onClick={() => alert('clicked')}>Click me</Button>)