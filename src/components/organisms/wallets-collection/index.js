import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import Button from '../../atoms/button'
import WalletSummary from '../../molecules/wallet-summary';

const WalletsCollection = ({ wallets }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container spacing={1} direction="row">
          {
            wallets.map((wallet) => <Grid item className={classes.walletItem}>
              <WalletSummary name={wallet.name} color={wallet.color} amount={wallet.amount} />
            </Grid>)
          }
          <Grid item className={classes.walletItem}>
            <Button style={{ height: '100%' }}>+</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WalletsCollection;
