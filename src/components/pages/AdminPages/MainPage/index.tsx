import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import useStyles from "./styles";
import WalletsCollection from "../../../organisms/wallets-collection";
import {
  useWalletsQuery,
  Wallet,
  useTransactionSpendingFlowLazyQuery,
  useCategoriesSpendingPieLazyQuery,
  TransactionType,
  useCategoriesSpendingFlowLazyQuery
} from "../../../../api";
import LastTransactions from "components/organisms/last-transactions";
import SummaryBox from "components/molecules/summary-box";
import Chart from "react-google-charts";
import moment from "moment";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";

const MainPage = () => {
  const classes = useStyles();

  const oldChartData: any = useRef([]);
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

  const [
    getReport,
    { data: spendingFlowData, loading }
  ] = useTransactionSpendingFlowLazyQuery({ fetchPolicy: "network-only" });

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1])
  ]);
  const chartData = [flowColumns, ...flowChart];

  const [
    getSpendingChart,
    { data: spendingQueryData, loading: spendingPieLoading }
  ] = useCategoriesSpendingPieLazyQuery({ fetchPolicy: "network-only" });

  const spendingData: any = {
    header: spendingQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: spendingQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      spendingQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  const [
    getIncomeChart,
    { data: incomeQueryData, loading: incomePieLoading }
  ] = useCategoriesSpendingPieLazyQuery({ fetchPolicy: "network-only" });

  const incomeData: any = {
    header: incomeQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: incomeQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      incomeQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  const [
    getSpendingFlowReport,
    { data: spendingFlowQueryData, loading: spendingFlowLoading }
  ] = useCategoriesSpendingFlowLazyQuery({ fetchPolicy: "network-only" });

  const spendingCategoryFlowData: any = {
    header: spendingFlowQueryData?.categoriesSpendingFlow?.header ?? [],
    colors: spendingFlowQueryData?.categoriesSpendingFlow?.colors ?? [],
    data: (spendingFlowQueryData?.categoriesSpendingFlow?.data ?? []).map(
      (row: any) => {
        const result: any = [moment.utc(row[0]).toDate()];
        for (let i = 1; i < row.length; i++) {
          result.push(parseFloat(row[i]));
        }
        return result;
      }
    )
  };

  const updateReports = useCallback(() => {
    getReport({
      variables: {
        date: null,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: []
      }
    });
    getSpendingChart({
      variables: {
        date: null,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: [],
        type: TransactionType.Expense
      }
    });
    getSpendingFlowReport({
      variables: {
        date: null,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: []
      }
    });
    getIncomeChart({
      variables: {
        date: null,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: [],
        type: TransactionType.Income
      }
    });
  }, [
    wallets,
    getReport,
    getSpendingChart,
    getIncomeChart,
    getSpendingFlowReport
  ]);

  useEffect(() => {
    updateReports();
  }, [wallets, updateReports]);

  if (flowColumns.length > 0) {
    oldChartData.current = chartData;
  }

  return (
    <Box className={classes.main} p={10}>
      <Grid direction="column">
        <Grid item xs={12} md={12} lg={12}>
          <Box mb={5} p={5} className={classes.collection}>
            <WalletsCollection
              wallets={wallets}
              onItemClick={onChosenWalletsClick}
            />
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={4} lg={3}>
                  <Box className={classes.transactions}>
                    <LastTransactions wallets={chosenWallets} onChange={() => updateReports()} />
                  </Box>
                </Grid>
                <Grid item xs={12} md={5} lg={6}>
                  <SummaryBox header="Spending flow">
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="AreaChart"
                      loader={<div>Loading Chart</div>}
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
                <Grid item xs={12} md={3} lg={3}>
                  <SummaryBox header="Spending">
                    <PieChart
                      data={spendingData}
                      loading={spendingPieLoading}
                    />
                  </SummaryBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={3} lg={3}>
                    <SummaryBox header="Income">
                      <PieChart data={incomeData} loading={incomePieLoading} />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={5} lg={6}>
                    <SummaryBox header="Spending flow by categories">
                      <LineChart
                        hTitle="Time"
                        vTitle="Money"
                        data={spendingCategoryFlowData}
                        loading={spendingFlowLoading}
                      />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={3} lg={3}>
                    <SummaryBox header="Income">
                      <PieChart data={incomeData} loading={incomePieLoading} />
                    </SummaryBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
      amount
    }
  }
`;

export default MainPage;
