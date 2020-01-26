import React from 'react';
import { storiesOf } from '@storybook/react'
import Login from '.';

export default { title: 'Login' };

storiesOf('Login', module)
  .add('default', () => <Login />)