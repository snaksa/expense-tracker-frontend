import React from 'react';
import { storiesOf } from '@storybook/react'
import ExpenseTable from '.';

export default { title: 'ExpenseTable' };

storiesOf('ExpenseTable', module)
  .add('default', () => <ExpenseTable />)