import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import Chart from "react-google-charts";
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
  useLabelsQuery,
  Label,
} from "api";
import useTranslations from "translations";
import useCurrencyFormatter from "services/currency-formatter";
import TransactionsTable from "components/tables/transactions-table";
import PieChart from "components/charts/pie-chart";
import LineChart from "components/charts/line-chart";
import SummaryBox from "components/core/summary-box";
import CheckboxList from "components/core/checkbox-list";
import Loader from "components/core/loader";
import useStyles from "./styles";
import DatePicker from "components/forms/fields/datepicker";
import DateUtils, { Range } from "utils/dateUtils";
import useChartsFormatter from "services/charts-formatter";

const StatsPage = () => {
  const classes = useStyles();
  const { getCurrency, formatCurrency } = useCurrencyFormatter();
  const { t } = useTranslations();
  const { formatTransactionSpendingFlow, formatCategoriesSpendingPie, formatCategoriesSpendingFlow } = useChartsFormatter();

  const [startDate, setStartDate] = useState(DateUtils.calculateBackDate(Range.Last7Days));
  const [endDate, setEndDate] = useState(DateUtils.getToday());

  const { data: categoriesData } = useCategoriesQuery();
  const categories: any = categoriesData?.categories ?? [];

  const { data: labelsData } = useLabelsQuery();
  const labels: any = labelsData?.labels ?? [];

  const [chosenWallets, setChosenWallets] = useState<number[]>([]);
  const [chosenCategories, setChosenCategories] = useState<number[]>([]);
  const [chosenLabels, setChosenLabels] = useState<number[]>([]);

  const { data } = useWalletsQuery();
  const wallets: any = data ? (data.wallets ? data.wallets : []) : [];

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

  const onChosenLabelsClick = (labelId: number, isChecked: boolean) => {
    const a = [...chosenLabels];
    if (isChecked) {
      a.push(labelId);
      setChosenLabels(a);
    } else {
      setChosenLabels(a.filter((label) => label !== labelId));
    }
  };

  const {
    data: spendingFlowData,
    loading,
    refetch: refetchReport,
  } = useTransactionSpendingFlowQuery({
    variables: {
      startDate: DateUtils.toUTCString(startDate),
      endDate: DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })),
      timezone: DateUtils.getTimezone(),
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      labelIds: chosenLabels,
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: spendingQueryData,
    refetch: refetchSpendingPie,
  } = useCategoriesSpendingPieQuery({
    variables: {
      startDate: DateUtils.toUTCString(startDate),
      endDate: DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })),
      timezone: DateUtils.getTimezone(),
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      type: TransactionType.Expense,
      labelIds: chosenLabels,
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: incomeQueryData,
    refetch: refetchIncomePie,
  } = useCategoriesSpendingPieQuery({
    variables: {
      startDate: DateUtils.toUTCString(startDate),
      endDate: DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })),
      timezone: DateUtils.getTimezone(),
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      type: TransactionType.Income,
      labelIds: chosenLabels,
    },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: spendingFlowQueryData,
    refetch: refetchSpendingFlow,
  } = useCategoriesSpendingFlowQuery({
    variables: {
      startDate: DateUtils.toUTCString(startDate),
      endDate: DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 })),
      timezone: DateUtils.getTimezone(),
      walletIds: chosenWallets,
      categoryIds: chosenCategories,
      labelIds: chosenLabels,
    },
    fetchPolicy: "cache-and-network",
  });

  const transactionSpendingFlowData = formatTransactionSpendingFlow(spendingFlowData);
  const spendingData: any = formatCategoriesSpendingPie(spendingQueryData);
  const incomeData: any = formatCategoriesSpendingPie(incomeQueryData);
  const spendingCategoryFlowData: any = formatCategoriesSpendingFlow(spendingFlowQueryData);

  const totalSpent = useMemo(() => {
    let total = 0;
    spendingData['data'].forEach((element: any) => {
      total += element[1];
    });

    return total;
  }, [spendingData]);

  const totalIncome = useMemo(() => {
    let total = 0;
    incomeData['data'].forEach((element: any) => {
      total += element[1];
    });

    return total;
  }, [incomeData])

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

  const labelOptions = useMemo(
    () =>
      labels.map((label: Label) => {
        return {
          id: label.id,
          label: label.name,
          checked: chosenLabels.includes(label.id),
        };
      }),
    [labels, chosenLabels]
  );

  return (
    <Box className={classes.main} p={10}>
      <Helmet>
        <title>{t("Stats | Expenses Tracker")}</title>
      </Helmet>
      <Grid container direction="row" spacing={5}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Grid container direction='row' spacing={5} justify='flex-start'>
            <Grid item xs={12} md={2} lg={2} xl={2}>
              <SummaryBox responsiveHeight={true} header={t('Income')} centerHeader={true}>
                <Box mt={4} textAlign='center' style={{ color: 'green' }}>{formatCurrency(totalIncome)}</Box>
              </SummaryBox>
            </Grid>
            <Grid item xs={12} md={2} lg={2} xl={2}>
              <SummaryBox responsiveHeight={true} header={t('Spent')} centerHeader={true}>
                <Box mt={4} textAlign='center' style={{ color: 'red' }}>{formatCurrency(totalSpent)}</Box>
              </SummaryBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={2} lg={2} xl={2}>
          <Grid
            container
            direction={"column"}
            spacing={5}
          >
            <Grid item>
              <SummaryBox responsiveHeight={true}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <DatePicker
                      name="startDate"
                      label="Start Date"
                      date={startDate}
                      onChange={(date: Date) => setStartDate(DateUtils.toMomentDate(date))}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
            <Grid item>
              <SummaryBox
                header={t("Labels")}
                responsiveHeight={true}
                toggle={true}
              >
                <CheckboxList
                  options={labelOptions}
                  onChange={onChosenLabelsClick}
                />
              </SummaryBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={10} lg={10} xl={10}>
          <Grid container direction="column" spacing={5}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container spacing={5}>
                <Grid item xs={12} md={12} lg={9}>
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
                  <Grid item xs={12} md={12} lg={9}>
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
                startDate={DateUtils.toUTCString(startDate)}
                endDate={DateUtils.toUTCString(endDate.set({ hour: 23, minute: 59, second: 59, millisecond: 59 }))}
                walletIds={chosenWallets}
                categoryIds={chosenCategories}
                labelIds={chosenLabels}
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
