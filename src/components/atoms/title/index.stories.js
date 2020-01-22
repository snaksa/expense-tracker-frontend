import React from 'react';
import { storiesOf } from '@storybook/react'
import Title from '.';

export default { title: 'Title' };

storiesOf('Title', module)
  .add('h1', () => <Title variant="h1">My Title</Title>)
  .add('h2', () => <Title variant="h2">My Title</Title>)
  .add('h3', () => <Title variant="h3">My Title</Title>)
  .add('h4', () => <Title variant="h4">My Title</Title>)
  .add('h5', () => <Title variant="h5">My Title</Title>)
  .add('h6', () => <Title variant="h6">My Title</Title>)