import React from 'react';
import { storiesOf } from '@storybook/react'
import WalletSummary from '.';

export default { title: 'WalletSummary' };

storiesOf('WalletSummary', module)
  .add('default', () => <WalletSummary name="Bank" amount={500} color='red' />)