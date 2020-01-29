import React from 'react';
import Grid from '@material-ui/core/Grid';
import useStyles from './styles';
import Button from '../../atoms/button'
import WalletSummary from '../../molecules/wallet-summary';
import { Wallet } from 'api';

interface Props {
  wallets: Array<Wallet>;
};

const WalletsCollection: React.FunctionComponent<Props> = ({wallets}): JSX.Element => {
  const classes = useStyles({});

  return (
    <Grid container direction="column">
      <Grid item>
        <Grid container direction="row">
          {
            wallets.map((wallet: Wallet) => <Grid item className={classes.walletItem}>
              <WalletSummary name={wallet.name} color={wallet.color} amount={0} />
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
