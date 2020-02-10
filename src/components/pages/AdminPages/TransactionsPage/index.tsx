import React, { useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useWalletsQuery, useTransactionsLazyQuery, Wallet } from "api";
import TransactionsTable from "components/organisms/transactions-table";

const TransactionsPage = () => {
  const classes = useStyles();

  const [getTransactions, { data }] = useTransactionsLazyQuery();

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  useEffect(() => {
    getTransactions({
      variables: {
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        page: 0,
        limit: 0,
        unlimited: true
      }
    });
  }, [getTransactions, wallets]);

  const transactions: any = data?.transactions?.data ?? [];

  return (
    <Box className={classes.main} p={10}>
      <Grid container>
        <Grid item xs={12} md={12} lg={12}>
          <TransactionsTable
            transactions={transactions}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionsPage;
