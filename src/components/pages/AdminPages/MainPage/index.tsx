import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "./styles";
import ExpenseTable from "../../../organisms/expense-table";
import WalletsCollection from "../../../organisms/wallets-collection";
import { gql } from "apollo-boost";
import { useWalletsQuery, Wallet } from "../../../../api";

const MainPage = () => {
  const classes = useStyles();

  const [chosenWallets, setChosenWallets] = useState<number[]>([]);

  const { data } = useWalletsQuery();
  const wallets: any = data ? (data.wallets ? data.wallets : []) : [];

  useEffect(() => {
    setChosenWallets(wallets.map((wallet: Wallet) => wallet.id));
  }, [wallets]);

  const onChosenWalletsClick = (walletId: number, isChecked: boolean) => {
    const a = [...chosenWallets];
    if (isChecked) {
      a.push(walletId);
      setChosenWallets(a);
    } else {
      setChosenWallets(a.filter(wallet => wallet !== walletId));
    }
  };

  return (
    <Box className={classes.main} p={2}>
      <Grid direction="column">
        <Grid item>
          <WalletsCollection
            wallets={wallets}
            onItemClick={onChosenWalletsClick}
          />
        </Grid>
        <Grid item>
          <Box className={classes.expenses}>
            <ExpenseTable wallets={chosenWallets} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

MainPage.fragment = gql`
  query Wallets {
    wallets {
      id
      name
      color,
      amount
    }
  }
`;

export default MainPage;
