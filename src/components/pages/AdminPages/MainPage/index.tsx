import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { gql } from "apollo-boost";
import { useWalletsQuery } from "../../../../api";
import useStyles from "./styles";
import ExpenseTable from "../../../organisms/expense-table";
import WalletsCollection from "../../../organisms/wallets-collection";

const MainPage = () => {
  const classes = useStyles();

  const { data } = useWalletsQuery();
  const wallets: any = data ? data.wallets ? data.wallets : [] : [];

  return (
    <Box className={classes.main} p={2}>
      <Grid direction="column">
        <Grid item>
          <WalletsCollection wallets={wallets} />
        </Grid>
        <Grid item>
          <Box className={classes.expenses}>
            <ExpenseTable />
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
      color
    }
  }
`;

export default MainPage;
