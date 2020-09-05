import React from "react";
import { Helmet } from "react-helmet";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import Chart from "react-google-charts";
import moment from "moment";
import WalletsCollection from "components/organisms/wallets-collection";
import {
  useWalletsQuery,
  Wallet,
  useCategoriesSpendingPieQuery,
  TransactionType,
  useCategoriesSpendingFlowQuery,
  useTransactionSpendingFlowQuery,
  useCategoriesQuery,
} from "api";
import useTranslations from "translations";
import useCurrencyFormatter from "services/currency-formatter";
import LastTransactions from "components/organisms/last-transactions";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";
import SummaryBox from "components/molecules/summary-box";
import Loader from "components/atoms/loader";
import useStyles from "./styles";
import DateUtils from "utils/dateUtils";

const MainPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data } = useWalletsQuery();
  const wallets: any = data ? (data.wallets ? data.wallets : []) : [];

  const {
    data: spendingFlowData,
    loading,
    refetch: refetchReport,
  } = useTransactionSpendingFlowQuery({
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
    },
  });

  const flowColumns = spendingFlowData?.transactionSpendingFlow?.header ?? [];
  let flowChart: any = spendingFlowData?.transactionSpendingFlow?.data ?? [];
  flowChart = flowChart.map((row: any) => [
    moment.utc(row[0]).toDate(),
    parseFloat(row[1]),
  ]);
  const chartData = [flowColumns, ...flowChart];

  const {
    data: spendingQueryData,
    refetch: refetchSpendingPie,
  } = useCategoriesSpendingPieQuery({
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      type: TransactionType.Expense,
    },
  });

  const spendingData: any = {
    header: spendingQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: spendingQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      spendingQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])]),
  };

  const {
    data: incomeQueryData,
    refetch: refetchIncomePie,
  } = useCategoriesSpendingPieQuery({
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      type: TransactionType.Income,
    },
  });

  const incomeData: any = {
    header: incomeQueryData?.categoriesSpendingPieChart?.header ?? [],
    colors: incomeQueryData?.categoriesSpendingPieChart?.colors ?? [],
    data: (
      incomeQueryData?.categoriesSpendingPieChart?.data ?? []
    ).map((row: any) => [row[0], parseFloat(row[1])]),
  };

  const {
    data: spendingFlowQueryData,
    refetch: refetchSpendingFlow,
  } = useCategoriesSpendingFlowQuery({
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
    },
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
    ),
  };

  const updateCharts = () => {
    refetchReport();
    refetchSpendingPie();
    refetchIncomePie();
    refetchSpendingFlow();
  };

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Dashboard | Expenses Tracker")}</title>
      </Helmet>
      <Grid container direction="column">
        <Grid item xs={12} md={12} lg={12}>
          <Box mb={5} p={5} className={classes.collection}>
            <WalletsCollection wallets={wallets} />
          </Box>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={6} xl={3}>
                  <Box className={classes.transactions}>
                    <LastTransactions
                      categories={categories}
                      onChange={updateCharts}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={12} lg={6} xl={3}>
                  <SummaryBox header={t("Spending")}>
                    <PieChart data={spendingData} />
                  </SummaryBox>
                </Grid>
                <Grid item xs={12} md={6} lg={12} xl={6}>
                  <SummaryBox header={t("Spending flow")}>
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
            </Grid>
            <Grid item>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} lg={6} xl={9}>
                    <SummaryBox header={t("Spending flow by categories")}>
                      <LineChart
                        hTitle={t("Time")}
                        vTitle={t("Money")}
                        data={spendingCategoryFlowData}
                      />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} xl={3}>
                    <SummaryBox header={t("Income")}>
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
