import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import Chart from "react-google-charts";
import moment from "moment";
import { Box, Grid } from "@material-ui/core";
import {
  useWalletsQuery,
  Wallet,
  useCategoriesSpendingPieQuery,
  TransactionType,
  useCategoriesSpendingFlowQuery,
  useTransactionSpendingFlowQuery,
  useCategoriesQuery,
  Category,
} from "api";
import useTranslations from "translations";
import useCurrencyFormatter from "services/currency-formatter";
import TransactionsTable from "components/organisms/transactions-table";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";
import SummaryBox from "components/molecules/summary-box";
import CheckboxList from "components/molecules/checkbox-list";
import DateRangePicker, {
  Range,
  calculateBackDate,
} from "components/molecules/date-range-picker";
import Loader from "components/atoms/loader";
import useStyles from "./styles";

const StatsPage = () => {
  const classes = useStyles();
  const { getCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const [chosenWallets, setChosenWallets] = useState<number[]>([]);
  const [chosenCategories, setChosenCategories] = useState<number[]>([]);

  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));

  const { data } = useWalletsQuery();
  const wallets: any = data ? (data.wallets ? data.wallets : []) : [];

  useEffect(() => {
    setChosenWallets(wallets.map((wallet: Wallet) => wallet.id));
  }, [wallets]);

  useEffect(() => {
    setChosenCategories(categories.map((category: Category) => category.id));
  }, [categories]);

  const onChosenWalletsClick = (walletId: number, isChecked: boolean) => {
    const a = [...chosenWallets];
    if (isChecked) {
      a.push(walletId);
      setChosenWallets(a);
    } else {
      setChosenWallets(a.filter((wallet) => wallet !== walletId));
    }
  };

  const onChosenCategoriesClick = (categoryId: number, isChecked: boolean) => {
    const a = [...chosenCategories];
    if (isChecked) {
      a.push(categoryId);
      setChosenCategories(a);
    } else {
      setChosenCategories(a.filter((category) => category !== categoryId));
    }
  };

  const {
    data: spendingFlowData,
    loading,
    refetch: refetchReport,
  } = useTransactionSpendingFlowQuery({
    variables: {
      date: backDate,
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
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

  const {
    data: spendingQueryData,
    refetch: refetchSpendingPie,
  } = useCategoriesSpendingPieQuery({
    variables: {
      date: backDate,
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      type: TransactionType.Expense,
    },
    fetchPolicy: "cache-and-network",
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
      date: backDate,
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      type: TransactionType.Income,
    },
    fetchPolicy: "cache-and-network",
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
      date: backDate,
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
    },
    fetchPolicy: "cache-and-network",
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

  const refetchCharts = () => {
    refetchReport();
    refetchSpendingPie();
    refetchIncomePie();
    refetchSpendingFlow();
  };

  const walletOptions = useMemo(
    () =>
      wallets.map((wallet: Wallet) => {
        return {
          id: wallet.id,
          label: wallet.name,
          checked: chosenWallets.includes(wallet.id),
        };
      }),
    [wallets, chosenWallets]
  );

  const categoryOptions = useMemo(
    () =>
      categories.map((category: Category) => {
        return {
          id: category.id,
          label: category.name,
          checked: chosenCategories.includes(category.id),
        };
      }),
    [categories, chosenCategories]
  );

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Stats | Expenses Tracker")}</title>
      </Helmet>
      <Grid container direction="row" spacing={5}>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Grid
            container
            direction={"column"}
            spacing={5}
          >
            <Grid item>
              <DateRangePicker responsive={true} onChange={setBackDate} />
            </Grid>
            <Grid item>
              <SummaryBox
                header={t("Wallets")}
                responsiveHeight={true}
                toggle={true}
              >
                <CheckboxList
                  options={walletOptions}
                  onChange={onChosenWalletsClick}
                />
              </SummaryBox>
            </Grid>
            <Grid item>
              <SummaryBox
                header={t("Categories")}
                responsiveHeight={true}
                toggle={true}
              >
                <CheckboxList
                  options={categoryOptions}
                  onChange={onChosenCategoriesClick}
                />
              </SummaryBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} lg={10} xl={10}>
          <Grid container direction="column" spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={6} lg={9}>
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
                <Grid item xs={12} md={12} lg={3}>
                  <SummaryBox header={t("Spending")}>
                    <PieChart data={spendingData} />
                  </SummaryBox>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6} lg={3}>
                    <SummaryBox header={t("Income")}>
                      <PieChart data={incomeData} />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <SummaryBox header={t("Spending flow by categories")}>
                      <LineChart
                        hTitle={t("Time")}
                        vTitle={t("Money")}
                        data={spendingCategoryFlowData}
                      />
                    </SummaryBox>
                  </Grid>
                  <Grid item xs={12} md={12} lg={3}>
                    <SummaryBox header={t("Income")}>
                      <PieChart data={incomeData} />
                    </SummaryBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TransactionsTable
                selectedDate={backDate}
                walletIds={chosenWallets}
                cateogryIds={chosenCategories}
                onDelete={refetchCharts}
                onEdit={refetchCharts}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatsPage;
