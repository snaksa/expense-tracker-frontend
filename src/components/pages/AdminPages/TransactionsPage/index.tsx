import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { gql } from "apollo-boost";
import Chart from "react-google-charts";
import moment from "moment";
import { Box, Grid } from "@material-ui/core";
import { useWalletsQuery, useTransactionSpendingFlowQuery, Wallet } from "api";
import useTranslations from "translations";
import useCurrencyFormatter from "services/currency-formatter";
import TransactionsTable from "components/organisms/transactions-table";
import SummaryBox from "components/molecules/summary-box";
import DateRangePicker, {
  Range,
  calculateBackDate,
} from "components/molecules/date-range-picker";
import TransactionFormWrapper from "components/molecules/forms/transaction-form";
import Modal from "components/molecules/modal";
import Loader from "components/atoms/loader";
import useStyles from "./styles";

const TransactionsPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));
  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const showNewModal = useCallback(() => setNewModalIsOpen(true), []);
  const hideNewModal = useCallback(() => setNewModalIsOpen(false), []);

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

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1]),
  ]);

  const chartData = [flowColumns, ...flowChart];

  const onComplete = useCallback(() => {
    refetch();
    setNewModalIsOpen(false);
  }, [refetch]);

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Records | Expenses Tracker")}</title>
      </Helmet>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker onChange={setBackDate} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            selectedDate={backDate}
            walletIds={wallets.map((wallet: Wallet) => wallet.id)}
            onNewClick={showNewModal}
            onDelete={refetch}
            onEdit={refetch}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SummaryBox header={t("Spending flow")}>
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
                  title: t("Time"),
                  type: "date",
                  format: "Y-MM-dd",
                },
                vAxis: {
                  title: t("Money"),
                },
              }}
            />
          </SummaryBox>
        </Grid>
      </Grid>
      <Modal
        title={t("+ New Record")}
        isOpen={newModalIsOpen}
        handleClose={hideNewModal}
      >
        <TransactionFormWrapper
          onComplete={onComplete}
          onError={hideNewModal}
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
