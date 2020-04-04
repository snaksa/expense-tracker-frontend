import React from "react";
import { Grid, Box } from "@material-ui/core";
import useStyles from "./styles";
import { Transaction, TransactionType } from "api";
import RoundBox from "components/atoms/round-box";
import useCurrencyFormatter from "services/currency-formatter";
import formatDate from "services/date-formatter";

interface Props {
  transaction: Transaction;
}

const TransactionSummary = ({ transaction }: Props) => {
  const classes = useStyles();
  const { formatCurrency } = useCurrencyFormatter();

  return (
    <Box p={2} className={classes.wrapper}>
      <Grid
        container
        className={classes.main}
        direction="row"
        alignContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <RoundBox
            color={transaction?.category?.color}
            background={
              transaction?.type === TransactionType.Transfer
                ? `linear-gradient(90deg, ${transaction.wallet?.color ??
                    "#ccc"} 50%, ${transaction.walletReceiver?.color ??
                    "#ccc"} 50%)`
                : transaction?.category?.color
            }
            width={32}
            height={32}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            spacing={1}
          >
            <Grid item className={classes.top}>
              {transaction?.category?.name}
              {transaction?.type === TransactionType.Transfer &&
                (transaction.wallet?.name ?? "Unknown") +
                  " => " +
                  (transaction.walletReceiver?.name ?? "Unknown")}
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
                  <RoundBox
                    color={transaction?.wallet?.color ?? '#ccc'}
                    width={10}
                    height={10}
                  />
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
              {transaction?.type === TransactionType.Expense ? "-" : ""}
              {formatCurrency(transaction?.value ?? "")}
            </Grid>
            <Grid item className={classes.bottom}>
              {formatDate(transaction.date)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionSummary;
