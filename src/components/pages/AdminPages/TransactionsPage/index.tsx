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
import {
  Range,
  calculateBackDate
} from "components/molecules/date-range-picker";
import DatePicker from "components/atoms/form/datepicker";
import TransactionFormWrapper from "components/molecules/forms/transaction-form";
import Modal from "components/molecules/modal";
import Loader from "components/atoms/loader";
import DateUtils from "utils/dateUtils";
import useStyles from "./styles";

const TransactionsPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const [newModalIsOpen, setNewModalIsOpen] = useState(false);
  const showNewModal = useCallback(() => setNewModalIsOpen(true), []);
  const hideNewModal = useCallback(() => setNewModalIsOpen(false), []);

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];


  const [startDate, setStartDate] = useState(calculateBackDate(Range.Last7Days));
  const [endDate, setEndDate] = useState(DateUtils.getToday());

  const {
    data: spendingFlowData,
    refetch,
    loading,
  } = useTransactionSpendingFlowQuery({
    variables: {
      startDate: DateUtils.toUTCString(startDate),
      endDate: DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })),
      timezone: DateUtils.getTimezone(),
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
      <Grid container direction='column' alignContent={'center'} spacing={5}>
        <Grid item>
          <SummaryBox responsiveHeight={true}>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  name="startDate"
                  label="Start Date"
                  date={startDate}
                  onChange={(date: Date) => setStartDate(DateUtils.toMomentDate(date))}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  name="endDate"
                  label="End Date"
                  date={endDate}
                  onChange={(date: Date) => setEndDate(DateUtils.toMomentDate(date))}
                />
              </Grid>
            </Grid>
          </SummaryBox>
        </Grid>
      </Grid>
      <Box paddingBottom={5}></Box>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6} lg={6}>
          <TransactionsTable
            startDate={DateUtils.toUTCString(startDate)}
            endDate={DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 }))}
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
    $startDate: String
    $endDate: String
    $timezone: String
    $walletIds: [Int]!
    $categoryIds: [Int]
  ) {
    transactionSpendingFlow(
      input: { startDate: $startDate, endDate: $endDate, timezone: $timezone, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data
    }
  }
`;

export default TransactionsPage;
