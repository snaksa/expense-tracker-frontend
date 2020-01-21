import React from 'react';
import { storiesOf } from '@storybook/react'
import LoginForm from '.';

export default { title: 'LoginForm' };

storiesOf('LoginForm', module)
  .add('default', () => <LoginForm />)