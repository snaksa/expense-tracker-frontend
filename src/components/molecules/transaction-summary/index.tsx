import React from "react";
import { Grid, Box } from "@material-ui/core";
import useStyles from "./styles";
import { Transaction, TransactionType } from "api";
import RoundBox from "components/atoms/round-box";

interface Props {
  transaction: Transaction;
}

const TransactionSummary = ({ transaction }: Props) => {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.wrapper}>
      <Grid
        container
        className={classes.main}
        direction="row"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={2} alignItems="center" justify="center">
          <RoundBox color={transaction?.category?.color} width={32} height={32} />
        </Grid>
        <Grid item xs={6}>
          <Grid container direction="column" alignItems="flex-start" spacing={1}>
            <Grid item className={classes.top}>
              {transaction?.category?.name}
            </Grid>
            <Grid item className={classes.bottom}>
              <Grid
                container
                spacing={1}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <RoundBox color={transaction?.wallet?.color} width={10} height={10} />
                </Grid>
                <Grid item>{transaction?.wallet?.name}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column" alignItems="flex-end" spacing={1}>
            <Grid
              item
              className={classes.top}
              style={{
                color:
                  transaction?.type === TransactionType.Expense
                    ? "red"
                    : "green"
              }}
            >
              {transaction?.type === TransactionType.Expense ? "-" : ""}BGN{" "}
              {transaction?.value.toFixed(2)}
            </Grid>
            <Grid item className={classes.bottom}>
              {transaction.date}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionSummary;
