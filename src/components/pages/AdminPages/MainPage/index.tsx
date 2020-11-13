import React from "react";
import { Helmet } from "react-helmet";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import Chart from "react-google-charts";
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
import WalletsCollection from "components/organisms/wallets-collection";
import LastTransactions from "components/organisms/last-transactions";
import PieChart from "components/charts/pie-chart";
import LineChart from "components/charts/line-chart";
import SummaryBox from "components/core/summary-box";
import Loader from "components/core/loader";
import useStyles from "./styles";
import DateUtils from "utils/dateUtils";
import useChartsFormatter from "services/charts-formatter";

const MainPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();
  const { formatTransactionSpendingFlow, formatCategoriesSpendingPie, formatCategoriesSpendingFlow } = useChartsFormatter();

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data } = useWalletsQuery({ fetchPolicy: 'cache-and-network' });
  const wallets: any = data ? (data.wallets ? data.wallets : []) : [];

  const {
    data: spendingFlowData,
    loading,
    refetch: refetchReport,
  } = useTransactionSpendingFlowQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      labelIds: [],
    },
  });

  const {
    data: spendingQueryData,
    refetch: refetchSpendingPie,
  } = useCategoriesSpendingPieQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      type: TransactionType.Expense,
      categoryIds: [],
      labelIds: [],
    },
  });


  const {
    data: incomeQueryData,
    refetch: refetchIncomePie,
  } = useCategoriesSpendingPieQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      type: TransactionType.Income,
      categoryIds: [],
      labelIds: [],
    },
  });

  const {
    data: spendingFlowQueryData,
    refetch: refetchSpendingFlow,
  } = useCategoriesSpendingFlowQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      startDate: null,
      endDate: null,
      timezone: DateUtils.getTimezone(),
      walletIds: wallets.map((wallet: Wallet) => wallet.id),
      categoryIds: [],
      labelIds: []
    },
  });

  const transactionSpendingFlowData = formatTransactionSpendingFlow(spendingFlowData);
  const spendingData: any = formatCategoriesSpendingPie(spendingQueryData);
  const incomeData: any = formatCategoriesSpendingPie(incomeQueryData);
  const spendingCategoryFlowData: any = formatCategoriesSpendingFlow(spendingFlowQueryData);

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

                <Grid item xs={12} md={6} lg={6} xl={3}>
                  <SummaryBox header={t("Spending")}>
                    <PieChart data={spendingData} />
                  </SummaryBox>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={6}>
                  <SummaryBox header={t("Spending flow")}>
                    <Loader loading={loading} />
                    <Chart
                      width={"100%"}
                      height={"300px"}
                      chartType="AreaChart"
                      loader={<div></div>}
                      data={
                        transactionSpendingFlowData.length > 1
                          ? transactionSpendingFlowData
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
