import React from 'react';
import { storiesOf } from '@storybook/react'
import Register from '.';

export default { title: 'Register' };

storiesOf('Register', module)
  .add('default', () => <Register />)