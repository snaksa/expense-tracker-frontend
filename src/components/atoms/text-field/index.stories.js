import React from 'react';
import { storiesOf } from '@storybook/react'
import TextField from '.';

export default { title: 'TextField' };

storiesOf('TextField', module)
  .add('default', () => <TextField variant="standard" label="Email"/>)
  .add('filled', () => <TextField variant="filled"  label="Email"/>)
  .add('outlined', () => <TextField variant="outlined"  label="Email"/>)