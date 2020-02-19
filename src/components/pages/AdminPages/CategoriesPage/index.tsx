import React, { useState, useEffect, useCallback } from "react";
import { Box, Grid } from "@material-ui/core";
import { gql } from "apollo-boost";
import useStyles from "./styles";
import {
  useCategoriesQuery,
  TransactionType,
  useCategoriesSpendingFlowLazyQuery,
  Wallet,
  useWalletsQuery,
  useCategoriesSpendingPieLazyQuery
} from "api";
import CategoriesTable from "components/organisms/categories-table";
import Modal from "components/molecules/modal";
import CategoryForm from "components/organisms/category-form";
import SummaryBox from "components/molecules/summary-box";
import DateRangePicker, {
  calculateBackDate,
  Range
} from "components/molecules/date-range-picker";
import PieChart from "components/organisms/pie-chart";
import LineChart from "components/organisms/line-chart";
import moment from "moment";

const CategoriesPage = () => {
  const classes = useStyles();

  const [backDate, setBackDate] = useState(calculateBackDate(Range.Last7Days));
  const [newCategoryModalIsOpen, setNewCategoryModalIsOpen] = useState(false);

  const { data } = useCategoriesQuery({ fetchPolicy: "network-only" });
  const categories: any = data?.categories ?? [];

  const { data: walletsData } = useWalletsQuery();
  const wallets: any = walletsData?.wallets ?? [];

  const [
    getReport,
    { data: spendingFlowQueryData, loading: spendingFlowLoading }
  ] = useCategoriesSpendingFlowLazyQuery({ fetchPolicy: "network-only" });

  const spendingFlowData: any = {
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

  const updateReports = useCallback(() => {
    getReport({
      variables: {
        date: backDate,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: []
      }
    });
    getSpendingChart({
      variables: {
        date: backDate,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: [],
        type: TransactionType.Expense
      }
    });
    getIncomeChart({
      variables: {
        date: backDate,
        walletIds: wallets.map((wallet: Wallet) => wallet.id),
        categoryIds: [],
        type: TransactionType.Income
      }
    });
  }, [wallets, backDate, getReport, getSpendingChart, getIncomeChart]);

  useEffect(() => {
    updateReports();
  }, [updateReports]);

  return (
    <Box className={classes.main} p={10}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={12}>
          <DateRangePicker
            onChange={(date: any) => {
              setBackDate(date);
            }}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <SummaryBox header="Spending flow">
            <LineChart hTitle='Time' vTitle='Money' data={spendingFlowData} loading={spendingFlowLoading} />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CategoriesTable
            categories={categories}
            onClick={() => setNewCategoryModalIsOpen(true)}
            onEdit={() => updateReports()}
            onDelete={() => updateReports()}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Spending">
            <PieChart data={spendingData} loading={spendingPieLoading} />
          </SummaryBox>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <SummaryBox header="Income">
            <PieChart data={incomeData} loading={incomePieLoading} />
          </SummaryBox>
        </Grid>
      </Grid>
      <Modal
        title={"+ New Category"}
        isOpen={newCategoryModalIsOpen}
        handleClose={() => {
          setNewCategoryModalIsOpen(false);
        }}
      >
        <CategoryForm
          onComplete={() => setNewCategoryModalIsOpen(false)}
          onError={() => setNewCategoryModalIsOpen(false)}
        />
      </Modal>
    </Box>
  );
};

CategoriesPage.fragment = gql`
  query Categories {
    categories {
      id
      name
      color
      transactionsCount
      balance
      transactions {
        id
        value
        type
        date
      }
    }
  }
  query CategoriesSpendingFlow(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
  ) {
    categoriesSpendingFlow(
      input: { date: $date, walletIds: $walletIds, categoryIds: $categoryIds }
    ) {
      header
      data,
      colors
    }
  }
  query CategoriesSpendingPie(
    $date: String
    $walletIds: [Int]
    $categoryIds: [Int]
    $type: TransactionType
  ) {
    categoriesSpendingPieChart(
      input: {
        date: $date
        walletIds: $walletIds
        categoryIds: $categoryIds
        type: $type
      }
    ) {
      header
      data
      colors
    }
  }
`;

export default CategoriesPage;
