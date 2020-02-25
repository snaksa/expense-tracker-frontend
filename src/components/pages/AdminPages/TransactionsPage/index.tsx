import React, { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import {
  useWalletsQuery,
  useTransactionSpendingFlowLazyQuery,
  Wallet
} from "api";
import TransactionsTable from "components/organisms/transactions-table";
import Modal from "components/molecules/modal";
import TransactionForm from "components/organisms/transaction-form";
import { gql } from "apollo-boost";
import SummaryBox from "components/molecules/summary-box";
import Chart from "react-google-charts";
import moment from "moment";
import DateRangePicker, {
  Range,
  calculateBackDate
} from "components/molecules/date-range-picker";
import Loader from "components/atoms/loader";

const TransactionsPage = () => {
  const classes = useStyles();

  const oldChartData: any = useRef([]);
  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const [
    getReport,
    { data: spendingFlowData, refetch, loading }
  ] = useTransactionSpendingFlowLazyQuery({ fetchPolicy: "network-only" });

  useEffect(() => {
    getReport({
      variables: {
        date: backDate,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: []
      }
    });
  }, [wallets, getReport, backDate]);

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1])
  ]);

  const chartData = [flowColumns, ...flowChart];
  if (flowColumns.length > 0) {
    oldChartData.current = chartData;
  }

  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker onChange={(date: any) => setBackDate(date)} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            selectedDate={backDate}
            onNewClick={() => setNewModalIsOpen(true)}
            onDelete={() => {
              refetch({
                date: backDate,
                walletIds: wallets.map((wallet: Wallet) => wallet.id),
                categoryIds: []
              });
            }}
            onEdit={() => {
              refetch({
                date: backDate,
                walletIds: wallets.map((wallet: Wallet) => wallet.id),
                categoryIds: []
              });
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox header="Spending flow">
            <Loader loading={loading} />
            <Chart
              width={"100%"}
              height={"300px"}
              chartType="AreaChart"
              data={
                chartData && !loading
                  ? chartData
                  : oldChartData.current.length
                  ? oldChartData.current
                  : ["Date", "Money"]
              }
              options={{
                hAxis: {
                  title: "Time",
                  type: "date",
                  format: "Y-MM-dd"
                },
                vAxis: {
                  title: "Money"
                }
              }}
            />
          </SummaryBox>
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
              date: backDate ? backDate.format("Y-M-D") : null,
              walletIds: wallets.map((wallet: Wallet) => wallet.id),
              categoryIds: []
            });
            setNewModalIsOpen(false);
          }}
          onError={() => setNewModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

TransactionsPage.fragment = gql`
  query TransactionSpendingFlow(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
  ) {
    transactionSpendingFlow(
      input: { date: $date, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data
    }
  }
`;

export default TransactionsPage;
