import React, { useState, useEffect } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import useStyles from "./styles";
import WalletsCollection from "../../../organisms/wallets-collection";
import {
  useWalletsQuery,
  Wallet,
  useCategoriesSpendingPieQuery,
  TransactionType,
  useCategoriesSpendingFlowQuery,
  useTransactionSpendingFlowQuery,
  useCategoriesQuery
} from "api";
import LastTransactions from "components/organisms/last-transactions";
import SummaryBox from "components/molecules/summary-box";
import Chart from "react-google-charts";
import moment from "moment";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";
import Loader from "components/atoms/loader";
import { useUpdateDetectionContext } from "services/update-detection-provider";
import useCurrencyFormatter from "services/currency-formatter";
import { Helmet } from "react-helmet";

const MainPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();

  const {
    lastTransactionAction,
    lastCategoryAction,
    lastWalletAction
  } = useUpdateDetectionContext();

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

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

  const {
    data: spendingFlowData,
    loading,
    refetch: refetchReport
  } = useTransactionSpendingFlowQuery({
    variables: {
      date: null,
      walletIds: chosenWallets,
      categoryIds: []
    },
    fetchPolicy: "cache-and-network"
  });

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1])
  ]);
  const chartData = [flowColumns, ...flowChart];

  const {
    data: spendingQueryData,
    refetch: refetchSpendingPie
  } = useCategoriesSpendingPieQuery({
    variables: {
      date: null,
      walletIds: chosenWallets,
      categoryIds: [],
      type: TransactionType.Expense
    },
    fetchPolicy: "cache-and-network"
  });

  const spendingData: any = {
    header: spendingQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: spendingQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      spendingQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  const {
    data: incomeQueryData,
    refetch: refetchIncomePie
  } = useCategoriesSpendingPieQuery({
    variables: {
      date: null,
      walletIds: chosenWallets,
      categoryIds: [],
      type: TransactionType.Income
    },
    fetchPolicy: "cache-and-network"
  });

  const incomeData: any = {
    header: incomeQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: incomeQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      incomeQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])])
  };

  const {
    data: spendingFlowQueryData,
    refetch: refetchSpendingFlow
  } = useCategoriesSpendingFlowQuery({
    variables: {
      date: null,
      walletIds: chosenWallets,
      categoryIds: []
    },
    fetchPolicy: "cache-and-network"
  });

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

  useEffect(() => {
    refetchReport();
    refetchSpendingPie();
    refetchIncomePie();
    refetchSpendingFlow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastTransactionAction, lastCategoryAction, lastWalletAction]);

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>Home | Expenses Tracker</title>
      </Helmet>
      <Grid container direction="column">
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
                <Grid item xs={12} md={6} lg={3}>
                  <Box className={classes.transactions}>
                    <LastTransactions
                      wallets={chosenWallets}
                      categories={categories}
                      onChange={() => {}}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SummaryBox header="Spending flow">
                    <Loader loading={loading} />
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="AreaChart"
                      loader={<div></div>}
                      data={
                        chartData.length > 1
                          ? chartData
                          : [
                              ["", ""],
                              ["", 0]
                            ]
                      }
                      formatters={[
                        {
                          type: "NumberFormat",
                          column: 1,
                          options: {
                            suffix: ` ${getCurrency()}`
                          }
                        }
                      ]}
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
                <Grid item xs={12} md={12} lg={3}>
                  <SummaryBox header="Spending">
                    <PieChart data={spendingData} />
                  </SummaryBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} lg={3}>
                    <SummaryBox header="Income">
                      <PieChart data={incomeData} />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SummaryBox header="Spending flow by categories">
                      <LineChart
                        hTitle="Time"
                        vTitle="Money"
                        data={spendingCategoryFlowData}
                      />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={3}>
                    <SummaryBox header="Income">
                      <PieChart data={incomeData} />
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
