import React, { useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useWalletsQuery, useTransactionsLazyQuery, Wallet } from "api";
import TransactionsTable from "components/organisms/transactions-table";
import Modal from "components/molecules/modal";
import TransactionForm from "components/organisms/transaction-form";

const TransactionsPage = () => {
  const classes = useStyles();

  const [newModalIsOpen, setNewModalIsOpen] = useState(false);

  const [getTransactions, { data, refetch }] = useTransactionsLazyQuery();

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
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            wallets={wallets}
            transactions={transactions}
            onNewClick={() => setNewModalIsOpen(true)}
          />
        </Grid>
      </Grid>
      <Modal
        title={"+ New Record"}
        isOpen={newModalIsOpen}
        handleClose={() => {
          setNewModalIsOpen(false);
        }}
      >
        <TransactionForm
          wallets={wallets}
          onComplete={() => {
            refetch({
              walletIds: wallets.map((wallet: Wallet) => wallet.id),
              page: 0,
              limit: 0,
              unlimited: true
            });
            setNewModalIsOpen(false);
          }}
          onError={() => setNewModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

export default TransactionsPage;
