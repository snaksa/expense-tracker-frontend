import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '../../atoms/button'
import WalletSummary from '../../molecules/wallet-summary';

const WalletsCollection = ({ wallets }) => {
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container spacing={1} direction="row">
          {
            wallets.map((wallet) => <Grid item>
              <WalletSummary name={wallet.name} color={wallet.color} amount={wallet.amount} />
            </Grid>)
          }
          <Grid item>

          <Button style={{height: '100%'}}>+</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" spacing={1}>
          <Grid item>
            <Box mt={1} mb={1} width={'100px'}>
              <Button>New Record</Button>
            </Box>
          </Grid>
          <Grid item>
            <Box mt={1} mb={1} width={'100px'}>
              <Button>New Category</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WalletsCollection;
