import React, { useState, useEffect, useRef } from "react";
import { Box, Grid } from "@material-ui/core";
import useStyles from "./styles";
import { useWalletsQuery, useTransactionSpendingFlowQuery, Wallet } from "api";
import TransactionsTable from "components/organisms/transactions-table";
import Modal from "components/molecules/modal";
import { gql } from "apollo-boost";
import SummaryBox from "components/molecules/summary-box";
import Chart from "react-google-charts";
import moment from "moment";
import DateRangePicker, {
  Range,
  calculateBackDate,
} from "components/molecules/date-range-picker";
import Loader from "components/atoms/loader";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import useCurrencyFormatter from "services/currency-formatter";
import TransactionFormWrapper from "components/molecules/forms/transaction-form";
import { Helmet } from "react-helmet";

const TransactionsPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();

  const {
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction,
  } = useUpdateDetectionContext();

  const oldChartData: any = useRef([]);
  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const {
    data: spendingFlowData,
    refetch,
    loading,
  } = useTransactionSpendingFlowQuery({
    variables: {
      date: backDate,
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
    },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backDate, lastTransactionAction, lastCategoryAction, lastWalletAction]);

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1]),
  ]);

  const chartData = [flowColumns, ...flowChart];
  if (flowColumns.length > 0) {
    oldChartData.current = chartData;
  }

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>Records | Expenses Tracker</title>
      </Helmet>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker onChange={(date: any) => setBackDate(date)} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            selectedDate={backDate}
            walletIds={wallets.map((wallet: Wallet) => wallet.id)}
            onNewClick={() => setNewModalIsOpen(true)}
            onDelete={() => {}}
            onEdit={() => {}}
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
                chartData && chartData[0].length
                  ? chartData
                  : [
                      ["", ""],
                      ["", 0],
                    ]
              }
              formatters={[
                {
                  type: "NumberFormat",
                  column: 1,
                  options: {
                    suffix: ` ${getCurrency()}`,
                  },
                },
              ]}
              options={{
                hAxis: {
                  title: "Time",
                  type: "date",
                  format: "Y-MM-dd",
                },
                vAxis: {
                  title: "Money",
                },
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
        <TransactionFormWrapper
          onComplete={() => {
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
