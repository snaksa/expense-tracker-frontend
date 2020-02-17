import React, { useState } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import {
  useWalletsQuery,
  // useTransactionsLazyQuery,
  // Wallet,
  // Transaction,
  // TransactionType
} from "api";
import TransactionsTable from "components/organisms/transactions-table";
import Modal from "components/molecules/modal";
import TransactionForm from "components/organisms/transaction-form";
// import Chart from "react-google-charts";
// import SummaryBox from "components/molecules/summary-box";

const TransactionsPage = () => {
  const classes = useStyles();

  const [newModalIsOpen, setNewModalIsOpen] = useState(false);

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  // transactions.sort((a: Transaction, b: Transaction) => {
  //   const aDate = new Date(a.date);
  //   const bDate = new Date(b.date);

  //   return aDate > bDate ? -1 : bDate > aDate ? 1 : 0;
  // });

  // const currentDate: Date = new Date();
  // let backDate: Date = new Date();
  // backDate.setDate(currentDate.getDate() - 5);
  // const flowChart = [];

  // while (backDate <= currentDate) {
  //   let total = 0;
  //   transactions.forEach((transaction: any) => {
  //     const date = new Date(transaction.date);
  //     total +=
  //       transaction.type === TransactionType.Expense &&
  //       date.getDate() === backDate.getDate() &&
  //       date.getMonth() === backDate.getMonth() &&
  //       date.getFullYear() === backDate.getFullYear()
  //         ? transaction.value
  //         : 0;
  //   });

  //   flowChart.push([backDate.toLocaleDateString(), total]);
  //   backDate.setDate(backDate.getDate() + 1);
  //   total = 0;
  // }
  // const flowColumns = ["Date", "Money"];

  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            onNewClick={() => setNewModalIsOpen(true)}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          {/* <SummaryBox header="Spending flow">
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="AreaChart"
              loader={<div>Loading Chart</div>}
              data={[flowColumns, ...flowChart]}
              options={{
                hAxis: {
                  title: "Time"
                },
                vAxis: {
                  title: "Money"
                }
              }}
            />
          </SummaryBox> */}
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
          onComplete={() => setNewModalIsOpen(false)}
          onError={() => setNewModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

export default TransactionsPage;
